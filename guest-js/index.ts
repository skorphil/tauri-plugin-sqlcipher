import { invoke } from "@tauri-apps/api/core";

export async function ping(value: string): Promise<string | null> {
  return await invoke<{ value?: string }>("plugin:sqlciphercipher|ping", {
    payload: {
      value,
    },
  }).then((r) => (r.value ? r.value : null));
}

export interface QueryResult {
  /** The number of rows affected by the query. */
  rowsAffected: number;
  /**
   * The last inserted `id`.
   *
   * This value is not set for Postgres databases. If the
   * last inserted id is required on Postgres, the `select` function
   * must be used, with a `RETURNING` clause
   * (`INSERT INTO todos (title) VALUES ($1) RETURNING id`).
   */
  lastInsertId?: number;
}

/**
 * **Database**
 *
 * The `Database` class serves as the primary interface for
 * communicating with the rust side of the sql plugin.
 */
export default class Database {
  path: string;
  constructor(path: string) {
    this.path = path;
  }

  /**
   * **load**
   *
   * A static initializer which connects to the underlying database and
   * returns a `Database` instance once a connection to the database is established.
   *
   * # sqlcipher
   *
   * The path is relative to `tauri::path::BaseDirectory::App` and must start with `sqlcipher:`.
   *
   * @example
   * ```ts
   * const db = await Database.load("sqlcipher:test.db");
   * ```
   */
  static async load(path: string, key: string): Promise<Database> {
    const _path = await invoke<string>("plugin:sqlcipher|load", {
      db: path,
      encryption_key: key, // added encryption_key
    });

    return new Database(_path);
  }

  /**
   * **get**
   *
   * A static initializer which synchronously returns an instance of
   * the Database class while deferring the actual database connection
   * until the first invocation or selection on the database.
   *
   * # sqlcipher
   *
   * The path is relative to `tauri::path::BaseDirectory::App` and must start with `sqlcipher:`.
   *
   * @example
   * ```ts
   * const db = Database.get("sqlcipher:test.db");
   * ```
   */
  static get(path: string): Database {
    return new Database(path);
  }

  /**
   * **execute**
   *
   * Passes a SQL expression to the database for execution.
   *
   * @example
   * ```ts
   * // for sqlcipher & postgres
   * // INSERT example
   * const result = await db.execute(
   *    "INSERT into todos (id, title, status) VALUES ($1, $2, $3)",
   *    [ todos.id, todos.title, todos.status ]
   * );
   * // UPDATE example
   * const result = await db.execute(
   *    "UPDATE todos SET title = $1, completed = $2 WHERE id = $3",
   *    [ todos.title, todos.status, todos.id ]
   * );
   *
   * // for mysql
   * // INSERT example
   * const result = await db.execute(
   *    "INSERT into todos (id, title, status) VALUES (?, ?, ?)",
   *    [ todos.id, todos.title, todos.status ]
   * );
   * // UPDATE example
   * const result = await db.execute(
   *    "UPDATE todos SET title = ?, completed = ? WHERE id = ?",
   *    [ todos.title, todos.status, todos.id ]
   * );
   * ```
   */
  async execute(query: string, bindValues?: unknown[]): Promise<QueryResult> {
    const [rowsAffected, lastInsertId] = await invoke<[number, number]>(
      "plugin:sqlcipher|execute",
      {
        db: this.path,
        query,
        values: bindValues ?? [],
      }
    );
    return {
      lastInsertId,
      rowsAffected,
    };
  }

  /**
   * **select**
   *
   * Passes in a SELECT query to the database for execution.
   *
   * @example
   * ```ts
   * // for sqlcipher & postgres
   * const result = await db.select(
   *    "SELECT * from todos WHERE id = $1", [ id ]
   * );
   *
   * // for mysql
   * const result = await db.select(
   *    "SELECT * from todos WHERE id = ?", [ id ]
   * );
   * ```
   */
  async select<T>(query: string, bindValues?: unknown[]): Promise<T> {
    const result = await invoke<T>("plugin:sqlcipher|select", {
      db: this.path,
      query,
      values: bindValues ?? [],
    });

    return result;
  }

  /**
   * **close**
   *
   * Closes the database connection pool.
   *
   * @example
   * ```ts
   * const success = await db.close()
   * ```
   * @param db - Optionally state the name of a database if you are managing more than one. Otherwise, all database pools will be in scope.
   */
  async close(db?: string): Promise<boolean> {
    const success = await invoke<boolean>("plugin:sqlcipher|close", {
      db,
    });
    return success;
  }
}
