const functions = require('firebase-functions')
const gcs = require('@google-cloud/storage')({keyFilename: 'foodle-add-ict-firebase-adminsdk-9x6w5-f0fd65f34a.json'})
const spawn = require('child-process-promise').spawn
const admin = require('firebase-admin');

admin.initializeApp(functions.config().firebase)

exports.generateThumbnail = functions.storage.object()
  .onChange(event => {
    const object = event.data
    const filePath = object.name
    const fileName = filePath.split('/').pop()
    const fileBucket = object.bucket
    const bucket = gcs.bucket(fileBucket)
    const tempFilePath = `/tmp/${fileName}`
    const ref = admin.database().ref()
    const file = bucket.file(filePath)
    const thumbFilePath = filePath.replace(/(\/)?([^\/]*)$/, '$1thumb_$2')
    
    const databaseId = fileName.slice(0,fileName.lastIndexOf('.'))
    let thumbFileUrl;
    console.log('fileName is', fileName)
    console.log('dbID', databaseId)


    if (fileName.startsWith('thumb_')) {
      console.log('Already a Thumbnail.')
      return
    }

    if (!object.contentType.startsWith('image/')) {
      console.log('This is not an image.')
      return
    }

    if (object.resourceState === 'not_exists') {
      console.log('This is a deletion event.')
      return 
    }

    return bucket.file(filePath).download({
      destination: tempFilePath
    })
    .then(() => {
      console.log('Image download locally to', tempFilePath)
      return spawn('convert', [tempFilePath, '-thumbnail', '800x800>', tempFilePath])
    })
    .then(() => {
      console.log('Thumnail created!')
      return bucket.upload(tempFilePath, {
        destination: thumbFilePath
      })
    })
    .then(() => {
      const thumbFile = bucket.file(thumbFilePath)
      const config = {
        action: 'read',
        expires: '03-09-2491'
      }
      return Promise.all([
        thumbFile.getSignedUrl(config),
        file.getSignedUrl(config)
      ])
    })
    .then(results => {
      const thumbResult = results[0]
      const originalResult = results[1]
      thumbFileUrl = thumbResult[0]
      const fileUrl = originalResult[0]

      return ref.child(`foods/${databaseId}`).once('value')
    })
    .then(res => {
      if (res.val()) {
        ref.child(`foods/${databaseId}`).update({ thumbnailUrl: thumbFileUrl })
      } else {
        ref.child(`reviews/${databaseId}`).update({ thumbnailUrl: thumbFileUrl })        
      }
    })
  })
