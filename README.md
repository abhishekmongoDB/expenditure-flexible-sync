# Realm Flexible Sync Tutorial

Follow along at https://www.mongodb.com/docs/atlas/app-services/sync/data-access-patterns/flexible-sync/#flexible-sync


## Getting started
* Create an App with the App Services UI https://www.mongodb.com/docs/atlas/app-services/manage-apps/create/create-with-ui/
* Add Users & Authentication via Email/Password https://www.mongodb.com/docs/atlas/app-services/authentication/
* Enable Atlas Device Sync [Enable Flexible Sync] https://www.mongodb.com/docs/atlas/app-services/sync/configure/enable-sync/#enable-flexible-sync
* Define Permissions  

```
{
  "rules": {},
  "defaultRoles": [
    {
      "name": "read-write",
      "applyWhen": {},
      "read": {
        "user_id": "%%user.id"
      },
      "write": {
        "user_id": "%%user.id"
      }
    }
  ]
}
```


Please feel free to ping me for suggestions or feedback.

## How to run React Native

* Clone repo  git clone https://github.com/abhishekmongoDB/expenditure-flexible-sync.git
* Open terminal and run below
  * cd react-native-expenditure/
  * npm install 
  * npm start
* Open iOS/Android Project to run

  
