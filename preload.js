const bookmarks = require("./db/bookmarks.json")
const { shell } = require("electron")
const { pull } = require("./git.js")
const { utools } = window


const getTagList = (bookmarks)=>{
   const map = {}

   bookmarks.forEach(item=>{
      const tags = item.tags;
      tags.forEach(tag=>{
         if(!map[tag]){
            map[tag] = []
         }
         map[tag].push(item)
      })
   })

   return Object.keys(map).map(title=>{
      return {
         title,
         isTag:true,
         children:map[title]
      }
   })
}

let tags = [],isClickTag = false,currentClickTagData = {}

window.exports = {
  "olading-bookmarking": {
     mode: "list",
     args: {
        // 进入插件应用时调用（可选）
        enter: (action, callbackSetList) => {
            tags = getTagList(bookmarks)
            // 如果进入插件应用就要显示列表数据
            callbackSetList(tags)
        },
        search: (action, searchWord, callbackSetList) => {
            if(!isClickTag) {
               if(searchWord) {
                  callbackSetList(tags.filter(item=>item.title.includes(searchWord)))
               }else{
                  callbackSetList(tags)
               }
               return 
            }

            if(!searchWord) {
               callbackSetList(currentClickTagData.children)
               return
            }

            callbackSetList(currentClickTagData.children.filter(item=>item.title.includes(searchWord)))
        },
        select: (action, itemData, callbackSetList) => {

         isClickTag = itemData.isTag
         
         if(!isClickTag) {
            shell.openExternal(itemData.url)
            // window.utools.hideMainWindow()
            // window.utools.outPlugin()
            return 
         }

         currentClickTagData = itemData
         callbackSetList(itemData.children)
        },
        placeholder: "请输入搜索内容"
     } 
  },
  "olading-bookmarking-pull": {
   mode: "none",
   args: {
      // 进入插件应用时调用（可选）
      enter: (action, callbackSetList) => {
         pull()
         // utools.showNotification("正在拉取数据")
         // utools.hideMainWindow()
         // utools.outPlugin()
      },
   } 
}
}