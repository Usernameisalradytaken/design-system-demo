{
"name": "{%componentName%}",
"version": "0.0.0",
"type": "module",
"private": true,
"repository": {
"type":"git",
},
"author": {
"name": "{%authorName%}",
"email": "{%authorEmail%}"
},
"scripts":{
"build": "vue-tsc && tsc --project tsconfig.index.json"
},
"peerDependencies": {
"tailwindcss": "^4.3.3"
},
"dependencies": {
"vue": "^3.5.40"
},
"devDependencies": {
"@vitejs/plugin-vue": "^6.0.8",
"@vue/tsconfig": "^0.9.1",
"typescript": "~6.0.2",
"vite": "^8.2.0",
"vue-tsc": "^3.3.8"
}
}
