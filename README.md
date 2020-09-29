### 配合uri scheme
#### package.json 中增加配置 edu就是schedule name，配置之后主程序入口还需要添加 `app.setAsDefaultProtocolClient('edu')` 绑定这个scheme
#### 当在https的网站中打开时第一次将会提醒，记住默认打开后将不再提醒
`
      "packagerConfig": {
        "extendInfo": {
          "CFBundleURLTypes": [{
            "CFBundleURLName": "edu",
            "CFBundleURLSchemes": "edu"
          }]
        }
      },
`

### 打包
```
npm run package
```