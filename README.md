# tauri-plugin-sqlcipher
This is my attempt to add SQLCipher support to tauri.

Forked from `tauri-plugin-sql` https://github.com/tauri-apps/tauri-plugin-sql/tree/v2


Under development

Errors vith :
- in `sqlite.rs` in `.try_decode::<HERE>()`
- in wrapper.rs `query.bind(value); // the trait bound serde_json::Value: sqlx::Encode<'_, Sqlite> is not satisfied the following other types implement trait `


```
npm i tauri-plugin-sqlcipher-api
```