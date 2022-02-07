<template>
      <q-item clickable v-ripple>
        <q-item-section> {{file.title}}</q-item-section>
        <q-item-section avatar >
         <q-btn flat color="primary"
          icon="file_download"
          no-caps
          v-if="showDownload"
          @click.stop="getInfoDocsOrImagesById(file.id)"/>
       </q-item-section>
      </q-item>
</template>
<script>
import InfoDocsOrImages from '../../store/models/dorcOrImages/InfoDocsOrImages'
import { Notify } from 'quasar'
export default {
    props: ['file', 'id', 'showDownload'],
    methods: {
      forceFileDownload (materialEducativo, title) {
 if (typeof cordova !== 'undefined') {
     Notify.create({
                    icon: 'announcement',
                    message: 'tentando download',
                    type: 'negative',
                    progress: true,
                    timeout: 3000,
                    position: 'top',
                    color: 'negative',
                    textColor: 'white',
                    classes: 'glossy'
                  })
     var blob = new Blob(materialEducativo.blop)
     saveBlob2File(title, blob)
     function saveBlob2File (fileName, blob) {
        var folder = cordova.file.externalRootDirectory + 'Download'
        window.resolveLocalFileSystemURL(folder, function (dirEntry) {
          console.log('file system open: ' + dirEntry.name)
          createFile(dirEntry, fileName, blob)
        }, onErrorLoadFs)
      }
         function createFile (dirEntry, fileName, blob) {
        // Creates a new file
        dirEntry.getFile(fileName, { create: true, exclusive: false }, function (fileEntry) {
          writeFile(fileEntry, blob)
        }, onErrorCreateFile)
      }

      function writeFile (fileEntry, dataObj) {
        // Create a FileWriter object for our FileEntry
        fileEntry.createWriter(function (fileWriter) {
          fileWriter.onwriteend = function () {
            console.log('Successful file write...')
          }

          fileWriter.onerror = function (error) {
            console.log('Failed file write: ' + error)
          }
          fileWriter.write(dataObj)
        })
      }
      function onErrorLoadFs (error) {
        console.log(error)
      }

      function onErrorCreateFile (error) {
        console.log(error)
      }
 } else {
        const bytes = btoa(new Uint8Array(materialEducativo.blop).reduce((data, byte) => data + String.fromCharCode(byte), ''))
        const url = 'data:application/pdf;base64, ' + bytes
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', title)
        document.body.appendChild(link)
        link.click()
 }
    },
     getInfoDocsOrImagesById (id) {
            InfoDocsOrImages.api().get('/infoDocsOrImages/' + id).then(resp => {
              //  offset = offset + 100
                console.log(resp.response.data)
                this.forceFileDownload(resp.response.data, resp.response.data.title + '.pdf')
                 this.$q.loading.hide()
            }).catch(error => {
                 this.$q.loading.hide()
                console.log(error)
            })
        },
        writeFile(fileEntry, dataObj, isAppend) {

    // Create a FileWriter object for our FileEntry (log.txt).
    fileEntry.createWriter(function (fileWriter) {

        fileWriter.onwriteend = function() {
            console.log("Successful file write...")
            if (dataObj.type == "image/png") {
                readBinaryFile(fileEntry)
            }
            else {
                readFile(fileEntry)
            }
        }

        fileWriter.onerror = function(e) {
            console.log("Failed file write: " + e.toString())
        }

        fileWriter.write(dataObj)
    })
}
  }
}
</script>
