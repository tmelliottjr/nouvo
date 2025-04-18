
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model account
 * 
 */
export type account = $Result.DefaultSelection<Prisma.$accountPayload>
/**
 * Model auth_sessions
 * 
 */
export type auth_sessions = $Result.DefaultSelection<Prisma.$auth_sessionsPayload>
/**
 * Model auth_users
 * 
 */
export type auth_users = $Result.DefaultSelection<Prisma.$auth_usersPayload>
/**
 * Model auth_verification_tokens
 * 
 */
export type auth_verification_tokens = $Result.DefaultSelection<Prisma.$auth_verification_tokensPayload>
/**
 * Model folders
 * 
 */
export type folders = $Result.DefaultSelection<Prisma.$foldersPayload>
/**
 * Model note_tags
 * 
 */
export type note_tags = $Result.DefaultSelection<Prisma.$note_tagsPayload>
/**
 * Model notes
 * 
 */
export type notes = $Result.DefaultSelection<Prisma.$notesPayload>
/**
 * Model pending_shares
 * 
 */
export type pending_shares = $Result.DefaultSelection<Prisma.$pending_sharesPayload>
/**
 * Model session
 * 
 */
export type session = $Result.DefaultSelection<Prisma.$sessionPayload>
/**
 * Model shares
 * 
 */
export type shares = $Result.DefaultSelection<Prisma.$sharesPayload>
/**
 * Model tags
 * 
 */
export type tags = $Result.DefaultSelection<Prisma.$tagsPayload>
/**
 * Model user
 * 
 */
export type user = $Result.DefaultSelection<Prisma.$userPayload>
/**
 * Model verification
 * 
 */
export type verification = $Result.DefaultSelection<Prisma.$verificationPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const pending_shares_permission: {
  read: 'read',
  write: 'write'
};

export type pending_shares_permission = (typeof pending_shares_permission)[keyof typeof pending_shares_permission]


export const shares_permission: {
  read: 'read',
  write: 'write'
};

export type shares_permission = (typeof shares_permission)[keyof typeof shares_permission]

}

export type pending_shares_permission = $Enums.pending_shares_permission

export const pending_shares_permission: typeof $Enums.pending_shares_permission

export type shares_permission = $Enums.shares_permission

export const shares_permission: typeof $Enums.shares_permission

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Accounts
 * const accounts = await prisma.account.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Accounts
   * const accounts = await prisma.account.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.account`: Exposes CRUD operations for the **account** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Accounts
    * const accounts = await prisma.account.findMany()
    * ```
    */
  get account(): Prisma.accountDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auth_sessions`: Exposes CRUD operations for the **auth_sessions** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Auth_sessions
    * const auth_sessions = await prisma.auth_sessions.findMany()
    * ```
    */
  get auth_sessions(): Prisma.auth_sessionsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auth_users`: Exposes CRUD operations for the **auth_users** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Auth_users
    * const auth_users = await prisma.auth_users.findMany()
    * ```
    */
  get auth_users(): Prisma.auth_usersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.auth_verification_tokens`: Exposes CRUD operations for the **auth_verification_tokens** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Auth_verification_tokens
    * const auth_verification_tokens = await prisma.auth_verification_tokens.findMany()
    * ```
    */
  get auth_verification_tokens(): Prisma.auth_verification_tokensDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.folders`: Exposes CRUD operations for the **folders** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Folders
    * const folders = await prisma.folders.findMany()
    * ```
    */
  get folders(): Prisma.foldersDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.note_tags`: Exposes CRUD operations for the **note_tags** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Note_tags
    * const note_tags = await prisma.note_tags.findMany()
    * ```
    */
  get note_tags(): Prisma.note_tagsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.notes`: Exposes CRUD operations for the **notes** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Notes
    * const notes = await prisma.notes.findMany()
    * ```
    */
  get notes(): Prisma.notesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.pending_shares`: Exposes CRUD operations for the **pending_shares** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Pending_shares
    * const pending_shares = await prisma.pending_shares.findMany()
    * ```
    */
  get pending_shares(): Prisma.pending_sharesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.session`: Exposes CRUD operations for the **session** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Sessions
    * const sessions = await prisma.session.findMany()
    * ```
    */
  get session(): Prisma.sessionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.shares`: Exposes CRUD operations for the **shares** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Shares
    * const shares = await prisma.shares.findMany()
    * ```
    */
  get shares(): Prisma.sharesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.tags`: Exposes CRUD operations for the **tags** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Tags
    * const tags = await prisma.tags.findMany()
    * ```
    */
  get tags(): Prisma.tagsDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.user`: Exposes CRUD operations for the **user** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.userDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.verification`: Exposes CRUD operations for the **verification** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Verifications
    * const verifications = await prisma.verification.findMany()
    * ```
    */
  get verification(): Prisma.verificationDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    account: 'account',
    auth_sessions: 'auth_sessions',
    auth_users: 'auth_users',
    auth_verification_tokens: 'auth_verification_tokens',
    folders: 'folders',
    note_tags: 'note_tags',
    notes: 'notes',
    pending_shares: 'pending_shares',
    session: 'session',
    shares: 'shares',
    tags: 'tags',
    user: 'user',
    verification: 'verification'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "account" | "auth_sessions" | "auth_users" | "auth_verification_tokens" | "folders" | "note_tags" | "notes" | "pending_shares" | "session" | "shares" | "tags" | "user" | "verification"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      account: {
        payload: Prisma.$accountPayload<ExtArgs>
        fields: Prisma.accountFieldRefs
        operations: {
          findUnique: {
            args: Prisma.accountFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.accountFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountPayload>
          }
          findFirst: {
            args: Prisma.accountFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.accountFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountPayload>
          }
          findMany: {
            args: Prisma.accountFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountPayload>[]
          }
          create: {
            args: Prisma.accountCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountPayload>
          }
          createMany: {
            args: Prisma.accountCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.accountDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountPayload>
          }
          update: {
            args: Prisma.accountUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountPayload>
          }
          deleteMany: {
            args: Prisma.accountDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.accountUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.accountUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$accountPayload>
          }
          aggregate: {
            args: Prisma.AccountAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAccount>
          }
          groupBy: {
            args: Prisma.accountGroupByArgs<ExtArgs>
            result: $Utils.Optional<AccountGroupByOutputType>[]
          }
          count: {
            args: Prisma.accountCountArgs<ExtArgs>
            result: $Utils.Optional<AccountCountAggregateOutputType> | number
          }
        }
      }
      auth_sessions: {
        payload: Prisma.$auth_sessionsPayload<ExtArgs>
        fields: Prisma.auth_sessionsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.auth_sessionsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_sessionsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.auth_sessionsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_sessionsPayload>
          }
          findFirst: {
            args: Prisma.auth_sessionsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_sessionsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.auth_sessionsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_sessionsPayload>
          }
          findMany: {
            args: Prisma.auth_sessionsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_sessionsPayload>[]
          }
          create: {
            args: Prisma.auth_sessionsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_sessionsPayload>
          }
          createMany: {
            args: Prisma.auth_sessionsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.auth_sessionsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_sessionsPayload>
          }
          update: {
            args: Prisma.auth_sessionsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_sessionsPayload>
          }
          deleteMany: {
            args: Prisma.auth_sessionsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.auth_sessionsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.auth_sessionsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_sessionsPayload>
          }
          aggregate: {
            args: Prisma.Auth_sessionsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuth_sessions>
          }
          groupBy: {
            args: Prisma.auth_sessionsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Auth_sessionsGroupByOutputType>[]
          }
          count: {
            args: Prisma.auth_sessionsCountArgs<ExtArgs>
            result: $Utils.Optional<Auth_sessionsCountAggregateOutputType> | number
          }
        }
      }
      auth_users: {
        payload: Prisma.$auth_usersPayload<ExtArgs>
        fields: Prisma.auth_usersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.auth_usersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_usersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.auth_usersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_usersPayload>
          }
          findFirst: {
            args: Prisma.auth_usersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_usersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.auth_usersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_usersPayload>
          }
          findMany: {
            args: Prisma.auth_usersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_usersPayload>[]
          }
          create: {
            args: Prisma.auth_usersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_usersPayload>
          }
          createMany: {
            args: Prisma.auth_usersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.auth_usersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_usersPayload>
          }
          update: {
            args: Prisma.auth_usersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_usersPayload>
          }
          deleteMany: {
            args: Prisma.auth_usersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.auth_usersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.auth_usersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_usersPayload>
          }
          aggregate: {
            args: Prisma.Auth_usersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuth_users>
          }
          groupBy: {
            args: Prisma.auth_usersGroupByArgs<ExtArgs>
            result: $Utils.Optional<Auth_usersGroupByOutputType>[]
          }
          count: {
            args: Prisma.auth_usersCountArgs<ExtArgs>
            result: $Utils.Optional<Auth_usersCountAggregateOutputType> | number
          }
        }
      }
      auth_verification_tokens: {
        payload: Prisma.$auth_verification_tokensPayload<ExtArgs>
        fields: Prisma.auth_verification_tokensFieldRefs
        operations: {
          findUnique: {
            args: Prisma.auth_verification_tokensFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_verification_tokensPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.auth_verification_tokensFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_verification_tokensPayload>
          }
          findFirst: {
            args: Prisma.auth_verification_tokensFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_verification_tokensPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.auth_verification_tokensFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_verification_tokensPayload>
          }
          findMany: {
            args: Prisma.auth_verification_tokensFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_verification_tokensPayload>[]
          }
          create: {
            args: Prisma.auth_verification_tokensCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_verification_tokensPayload>
          }
          createMany: {
            args: Prisma.auth_verification_tokensCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.auth_verification_tokensDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_verification_tokensPayload>
          }
          update: {
            args: Prisma.auth_verification_tokensUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_verification_tokensPayload>
          }
          deleteMany: {
            args: Prisma.auth_verification_tokensDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.auth_verification_tokensUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.auth_verification_tokensUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$auth_verification_tokensPayload>
          }
          aggregate: {
            args: Prisma.Auth_verification_tokensAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateAuth_verification_tokens>
          }
          groupBy: {
            args: Prisma.auth_verification_tokensGroupByArgs<ExtArgs>
            result: $Utils.Optional<Auth_verification_tokensGroupByOutputType>[]
          }
          count: {
            args: Prisma.auth_verification_tokensCountArgs<ExtArgs>
            result: $Utils.Optional<Auth_verification_tokensCountAggregateOutputType> | number
          }
        }
      }
      folders: {
        payload: Prisma.$foldersPayload<ExtArgs>
        fields: Prisma.foldersFieldRefs
        operations: {
          findUnique: {
            args: Prisma.foldersFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$foldersPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.foldersFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$foldersPayload>
          }
          findFirst: {
            args: Prisma.foldersFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$foldersPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.foldersFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$foldersPayload>
          }
          findMany: {
            args: Prisma.foldersFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$foldersPayload>[]
          }
          create: {
            args: Prisma.foldersCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$foldersPayload>
          }
          createMany: {
            args: Prisma.foldersCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.foldersDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$foldersPayload>
          }
          update: {
            args: Prisma.foldersUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$foldersPayload>
          }
          deleteMany: {
            args: Prisma.foldersDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.foldersUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.foldersUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$foldersPayload>
          }
          aggregate: {
            args: Prisma.FoldersAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateFolders>
          }
          groupBy: {
            args: Prisma.foldersGroupByArgs<ExtArgs>
            result: $Utils.Optional<FoldersGroupByOutputType>[]
          }
          count: {
            args: Prisma.foldersCountArgs<ExtArgs>
            result: $Utils.Optional<FoldersCountAggregateOutputType> | number
          }
        }
      }
      note_tags: {
        payload: Prisma.$note_tagsPayload<ExtArgs>
        fields: Prisma.note_tagsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.note_tagsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$note_tagsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.note_tagsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$note_tagsPayload>
          }
          findFirst: {
            args: Prisma.note_tagsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$note_tagsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.note_tagsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$note_tagsPayload>
          }
          findMany: {
            args: Prisma.note_tagsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$note_tagsPayload>[]
          }
          create: {
            args: Prisma.note_tagsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$note_tagsPayload>
          }
          createMany: {
            args: Prisma.note_tagsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.note_tagsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$note_tagsPayload>
          }
          update: {
            args: Prisma.note_tagsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$note_tagsPayload>
          }
          deleteMany: {
            args: Prisma.note_tagsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.note_tagsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.note_tagsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$note_tagsPayload>
          }
          aggregate: {
            args: Prisma.Note_tagsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNote_tags>
          }
          groupBy: {
            args: Prisma.note_tagsGroupByArgs<ExtArgs>
            result: $Utils.Optional<Note_tagsGroupByOutputType>[]
          }
          count: {
            args: Prisma.note_tagsCountArgs<ExtArgs>
            result: $Utils.Optional<Note_tagsCountAggregateOutputType> | number
          }
        }
      }
      notes: {
        payload: Prisma.$notesPayload<ExtArgs>
        fields: Prisma.notesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.notesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.notesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notesPayload>
          }
          findFirst: {
            args: Prisma.notesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.notesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notesPayload>
          }
          findMany: {
            args: Prisma.notesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notesPayload>[]
          }
          create: {
            args: Prisma.notesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notesPayload>
          }
          createMany: {
            args: Prisma.notesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.notesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notesPayload>
          }
          update: {
            args: Prisma.notesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notesPayload>
          }
          deleteMany: {
            args: Prisma.notesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.notesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.notesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$notesPayload>
          }
          aggregate: {
            args: Prisma.NotesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateNotes>
          }
          groupBy: {
            args: Prisma.notesGroupByArgs<ExtArgs>
            result: $Utils.Optional<NotesGroupByOutputType>[]
          }
          count: {
            args: Prisma.notesCountArgs<ExtArgs>
            result: $Utils.Optional<NotesCountAggregateOutputType> | number
          }
        }
      }
      pending_shares: {
        payload: Prisma.$pending_sharesPayload<ExtArgs>
        fields: Prisma.pending_sharesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.pending_sharesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pending_sharesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.pending_sharesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pending_sharesPayload>
          }
          findFirst: {
            args: Prisma.pending_sharesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pending_sharesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.pending_sharesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pending_sharesPayload>
          }
          findMany: {
            args: Prisma.pending_sharesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pending_sharesPayload>[]
          }
          create: {
            args: Prisma.pending_sharesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pending_sharesPayload>
          }
          createMany: {
            args: Prisma.pending_sharesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.pending_sharesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pending_sharesPayload>
          }
          update: {
            args: Prisma.pending_sharesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pending_sharesPayload>
          }
          deleteMany: {
            args: Prisma.pending_sharesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.pending_sharesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.pending_sharesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$pending_sharesPayload>
          }
          aggregate: {
            args: Prisma.Pending_sharesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregatePending_shares>
          }
          groupBy: {
            args: Prisma.pending_sharesGroupByArgs<ExtArgs>
            result: $Utils.Optional<Pending_sharesGroupByOutputType>[]
          }
          count: {
            args: Prisma.pending_sharesCountArgs<ExtArgs>
            result: $Utils.Optional<Pending_sharesCountAggregateOutputType> | number
          }
        }
      }
      session: {
        payload: Prisma.$sessionPayload<ExtArgs>
        fields: Prisma.sessionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.sessionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.sessionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload>
          }
          findFirst: {
            args: Prisma.sessionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.sessionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload>
          }
          findMany: {
            args: Prisma.sessionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload>[]
          }
          create: {
            args: Prisma.sessionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload>
          }
          createMany: {
            args: Prisma.sessionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.sessionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload>
          }
          update: {
            args: Prisma.sessionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload>
          }
          deleteMany: {
            args: Prisma.sessionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.sessionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.sessionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sessionPayload>
          }
          aggregate: {
            args: Prisma.SessionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSession>
          }
          groupBy: {
            args: Prisma.sessionGroupByArgs<ExtArgs>
            result: $Utils.Optional<SessionGroupByOutputType>[]
          }
          count: {
            args: Prisma.sessionCountArgs<ExtArgs>
            result: $Utils.Optional<SessionCountAggregateOutputType> | number
          }
        }
      }
      shares: {
        payload: Prisma.$sharesPayload<ExtArgs>
        fields: Prisma.sharesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.sharesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sharesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.sharesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sharesPayload>
          }
          findFirst: {
            args: Prisma.sharesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sharesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.sharesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sharesPayload>
          }
          findMany: {
            args: Prisma.sharesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sharesPayload>[]
          }
          create: {
            args: Prisma.sharesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sharesPayload>
          }
          createMany: {
            args: Prisma.sharesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.sharesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sharesPayload>
          }
          update: {
            args: Prisma.sharesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sharesPayload>
          }
          deleteMany: {
            args: Prisma.sharesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.sharesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.sharesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$sharesPayload>
          }
          aggregate: {
            args: Prisma.SharesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateShares>
          }
          groupBy: {
            args: Prisma.sharesGroupByArgs<ExtArgs>
            result: $Utils.Optional<SharesGroupByOutputType>[]
          }
          count: {
            args: Prisma.sharesCountArgs<ExtArgs>
            result: $Utils.Optional<SharesCountAggregateOutputType> | number
          }
        }
      }
      tags: {
        payload: Prisma.$tagsPayload<ExtArgs>
        fields: Prisma.tagsFieldRefs
        operations: {
          findUnique: {
            args: Prisma.tagsFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagsPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.tagsFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagsPayload>
          }
          findFirst: {
            args: Prisma.tagsFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagsPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.tagsFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagsPayload>
          }
          findMany: {
            args: Prisma.tagsFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagsPayload>[]
          }
          create: {
            args: Prisma.tagsCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagsPayload>
          }
          createMany: {
            args: Prisma.tagsCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.tagsDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagsPayload>
          }
          update: {
            args: Prisma.tagsUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagsPayload>
          }
          deleteMany: {
            args: Prisma.tagsDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.tagsUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.tagsUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$tagsPayload>
          }
          aggregate: {
            args: Prisma.TagsAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateTags>
          }
          groupBy: {
            args: Prisma.tagsGroupByArgs<ExtArgs>
            result: $Utils.Optional<TagsGroupByOutputType>[]
          }
          count: {
            args: Prisma.tagsCountArgs<ExtArgs>
            result: $Utils.Optional<TagsCountAggregateOutputType> | number
          }
        }
      }
      user: {
        payload: Prisma.$userPayload<ExtArgs>
        fields: Prisma.userFieldRefs
        operations: {
          findUnique: {
            args: Prisma.userFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.userFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findFirst: {
            args: Prisma.userFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.userFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          findMany: {
            args: Prisma.userFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>[]
          }
          create: {
            args: Prisma.userCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          createMany: {
            args: Prisma.userCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.userDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          update: {
            args: Prisma.userUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          deleteMany: {
            args: Prisma.userDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.userUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.userUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$userPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.userGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.userCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      verification: {
        payload: Prisma.$verificationPayload<ExtArgs>
        fields: Prisma.verificationFieldRefs
        operations: {
          findUnique: {
            args: Prisma.verificationFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verificationPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.verificationFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verificationPayload>
          }
          findFirst: {
            args: Prisma.verificationFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verificationPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.verificationFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verificationPayload>
          }
          findMany: {
            args: Prisma.verificationFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verificationPayload>[]
          }
          create: {
            args: Prisma.verificationCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verificationPayload>
          }
          createMany: {
            args: Prisma.verificationCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          delete: {
            args: Prisma.verificationDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verificationPayload>
          }
          update: {
            args: Prisma.verificationUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verificationPayload>
          }
          deleteMany: {
            args: Prisma.verificationDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.verificationUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          upsert: {
            args: Prisma.verificationUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$verificationPayload>
          }
          aggregate: {
            args: Prisma.VerificationAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateVerification>
          }
          groupBy: {
            args: Prisma.verificationGroupByArgs<ExtArgs>
            result: $Utils.Optional<VerificationGroupByOutputType>[]
          }
          count: {
            args: Prisma.verificationCountArgs<ExtArgs>
            result: $Utils.Optional<VerificationCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    account?: accountOmit
    auth_sessions?: auth_sessionsOmit
    auth_users?: auth_usersOmit
    auth_verification_tokens?: auth_verification_tokensOmit
    folders?: foldersOmit
    note_tags?: note_tagsOmit
    notes?: notesOmit
    pending_shares?: pending_sharesOmit
    session?: sessionOmit
    shares?: sharesOmit
    tags?: tagsOmit
    user?: userOmit
    verification?: verificationOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type Auth_usersCountOutputType
   */

  export type Auth_usersCountOutputType = {
    auth_sessions: number
  }

  export type Auth_usersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auth_sessions?: boolean | Auth_usersCountOutputTypeCountAuth_sessionsArgs
  }

  // Custom InputTypes
  /**
   * Auth_usersCountOutputType without action
   */
  export type Auth_usersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Auth_usersCountOutputType
     */
    select?: Auth_usersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * Auth_usersCountOutputType without action
   */
  export type Auth_usersCountOutputTypeCountAuth_sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: auth_sessionsWhereInput
  }


  /**
   * Count Type FoldersCountOutputType
   */

  export type FoldersCountOutputType = {
    other_folders: number
    notes: number
  }

  export type FoldersCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    other_folders?: boolean | FoldersCountOutputTypeCountOther_foldersArgs
    notes?: boolean | FoldersCountOutputTypeCountNotesArgs
  }

  // Custom InputTypes
  /**
   * FoldersCountOutputType without action
   */
  export type FoldersCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the FoldersCountOutputType
     */
    select?: FoldersCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * FoldersCountOutputType without action
   */
  export type FoldersCountOutputTypeCountOther_foldersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: foldersWhereInput
  }

  /**
   * FoldersCountOutputType without action
   */
  export type FoldersCountOutputTypeCountNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: notesWhereInput
  }


  /**
   * Count Type NotesCountOutputType
   */

  export type NotesCountOutputType = {
    note_tags: number
    shares: number
  }

  export type NotesCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    note_tags?: boolean | NotesCountOutputTypeCountNote_tagsArgs
    shares?: boolean | NotesCountOutputTypeCountSharesArgs
  }

  // Custom InputTypes
  /**
   * NotesCountOutputType without action
   */
  export type NotesCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NotesCountOutputType
     */
    select?: NotesCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * NotesCountOutputType without action
   */
  export type NotesCountOutputTypeCountNote_tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: note_tagsWhereInput
  }

  /**
   * NotesCountOutputType without action
   */
  export type NotesCountOutputTypeCountSharesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sharesWhereInput
  }


  /**
   * Count Type TagsCountOutputType
   */

  export type TagsCountOutputType = {
    note_tags: number
  }

  export type TagsCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    note_tags?: boolean | TagsCountOutputTypeCountNote_tagsArgs
  }

  // Custom InputTypes
  /**
   * TagsCountOutputType without action
   */
  export type TagsCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the TagsCountOutputType
     */
    select?: TagsCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * TagsCountOutputType without action
   */
  export type TagsCountOutputTypeCountNote_tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: note_tagsWhereInput
  }


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    folders: number
    notes: number
    shares: number
    tags: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    folders?: boolean | UserCountOutputTypeCountFoldersArgs
    notes?: boolean | UserCountOutputTypeCountNotesArgs
    shares?: boolean | UserCountOutputTypeCountSharesArgs
    tags?: boolean | UserCountOutputTypeCountTagsArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountFoldersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: foldersWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountNotesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: notesWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountSharesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sharesWhereInput
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountTagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tagsWhereInput
  }


  /**
   * Models
   */

  /**
   * Model account
   */

  export type AggregateAccount = {
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  export type AccountMinAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountMaxAggregateOutputType = {
    id: string | null
    accountId: string | null
    providerId: string | null
    userId: string | null
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type AccountCountAggregateOutputType = {
    id: number
    accountId: number
    providerId: number
    userId: number
    accessToken: number
    refreshToken: number
    idToken: number
    accessTokenExpiresAt: number
    refreshTokenExpiresAt: number
    scope: number
    password: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type AccountMinAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountMaxAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
  }

  export type AccountCountAggregateInputType = {
    id?: true
    accountId?: true
    providerId?: true
    userId?: true
    accessToken?: true
    refreshToken?: true
    idToken?: true
    accessTokenExpiresAt?: true
    refreshTokenExpiresAt?: true
    scope?: true
    password?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type AccountAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which account to aggregate.
     */
    where?: accountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of accounts to fetch.
     */
    orderBy?: accountOrderByWithRelationInput | accountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: accountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned accounts
    **/
    _count?: true | AccountCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: AccountMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: AccountMaxAggregateInputType
  }

  export type GetAccountAggregateType<T extends AccountAggregateArgs> = {
        [P in keyof T & keyof AggregateAccount]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAccount[P]>
      : GetScalarType<T[P], AggregateAccount[P]>
  }




  export type accountGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: accountWhereInput
    orderBy?: accountOrderByWithAggregationInput | accountOrderByWithAggregationInput[]
    by: AccountScalarFieldEnum[] | AccountScalarFieldEnum
    having?: accountScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: AccountCountAggregateInputType | true
    _min?: AccountMinAggregateInputType
    _max?: AccountMaxAggregateInputType
  }

  export type AccountGroupByOutputType = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken: string | null
    refreshToken: string | null
    idToken: string | null
    accessTokenExpiresAt: Date | null
    refreshTokenExpiresAt: Date | null
    scope: string | null
    password: string | null
    createdAt: Date
    updatedAt: Date
    _count: AccountCountAggregateOutputType | null
    _min: AccountMinAggregateOutputType | null
    _max: AccountMaxAggregateOutputType | null
  }

  type GetAccountGroupByPayload<T extends accountGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<AccountGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof AccountGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], AccountGroupByOutputType[P]>
            : GetScalarType<T[P], AccountGroupByOutputType[P]>
        }
      >
    >


  export type accountSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["account"]>



  export type accountSelectScalar = {
    id?: boolean
    accountId?: boolean
    providerId?: boolean
    userId?: boolean
    accessToken?: boolean
    refreshToken?: boolean
    idToken?: boolean
    accessTokenExpiresAt?: boolean
    refreshTokenExpiresAt?: boolean
    scope?: boolean
    password?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type accountOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "accountId" | "providerId" | "userId" | "accessToken" | "refreshToken" | "idToken" | "accessTokenExpiresAt" | "refreshTokenExpiresAt" | "scope" | "password" | "createdAt" | "updatedAt", ExtArgs["result"]["account"]>

  export type $accountPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "account"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      accountId: string
      providerId: string
      userId: string
      accessToken: string | null
      refreshToken: string | null
      idToken: string | null
      accessTokenExpiresAt: Date | null
      refreshTokenExpiresAt: Date | null
      scope: string | null
      password: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["account"]>
    composites: {}
  }

  type accountGetPayload<S extends boolean | null | undefined | accountDefaultArgs> = $Result.GetResult<Prisma.$accountPayload, S>

  type accountCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<accountFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: AccountCountAggregateInputType | true
    }

  export interface accountDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['account'], meta: { name: 'account' } }
    /**
     * Find zero or one Account that matches the filter.
     * @param {accountFindUniqueArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends accountFindUniqueArgs>(args: SelectSubset<T, accountFindUniqueArgs<ExtArgs>>): Prisma__accountClient<$Result.GetResult<Prisma.$accountPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Account that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {accountFindUniqueOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends accountFindUniqueOrThrowArgs>(args: SelectSubset<T, accountFindUniqueOrThrowArgs<ExtArgs>>): Prisma__accountClient<$Result.GetResult<Prisma.$accountPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {accountFindFirstArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends accountFindFirstArgs>(args?: SelectSubset<T, accountFindFirstArgs<ExtArgs>>): Prisma__accountClient<$Result.GetResult<Prisma.$accountPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Account that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {accountFindFirstOrThrowArgs} args - Arguments to find a Account
     * @example
     * // Get one Account
     * const account = await prisma.account.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends accountFindFirstOrThrowArgs>(args?: SelectSubset<T, accountFindFirstOrThrowArgs<ExtArgs>>): Prisma__accountClient<$Result.GetResult<Prisma.$accountPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Accounts that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {accountFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Accounts
     * const accounts = await prisma.account.findMany()
     * 
     * // Get first 10 Accounts
     * const accounts = await prisma.account.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const accountWithIdOnly = await prisma.account.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends accountFindManyArgs>(args?: SelectSubset<T, accountFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$accountPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Account.
     * @param {accountCreateArgs} args - Arguments to create a Account.
     * @example
     * // Create one Account
     * const Account = await prisma.account.create({
     *   data: {
     *     // ... data to create a Account
     *   }
     * })
     * 
     */
    create<T extends accountCreateArgs>(args: SelectSubset<T, accountCreateArgs<ExtArgs>>): Prisma__accountClient<$Result.GetResult<Prisma.$accountPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Accounts.
     * @param {accountCreateManyArgs} args - Arguments to create many Accounts.
     * @example
     * // Create many Accounts
     * const account = await prisma.account.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends accountCreateManyArgs>(args?: SelectSubset<T, accountCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Account.
     * @param {accountDeleteArgs} args - Arguments to delete one Account.
     * @example
     * // Delete one Account
     * const Account = await prisma.account.delete({
     *   where: {
     *     // ... filter to delete one Account
     *   }
     * })
     * 
     */
    delete<T extends accountDeleteArgs>(args: SelectSubset<T, accountDeleteArgs<ExtArgs>>): Prisma__accountClient<$Result.GetResult<Prisma.$accountPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Account.
     * @param {accountUpdateArgs} args - Arguments to update one Account.
     * @example
     * // Update one Account
     * const account = await prisma.account.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends accountUpdateArgs>(args: SelectSubset<T, accountUpdateArgs<ExtArgs>>): Prisma__accountClient<$Result.GetResult<Prisma.$accountPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Accounts.
     * @param {accountDeleteManyArgs} args - Arguments to filter Accounts to delete.
     * @example
     * // Delete a few Accounts
     * const { count } = await prisma.account.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends accountDeleteManyArgs>(args?: SelectSubset<T, accountDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {accountUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Accounts
     * const account = await prisma.account.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends accountUpdateManyArgs>(args: SelectSubset<T, accountUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Account.
     * @param {accountUpsertArgs} args - Arguments to update or create a Account.
     * @example
     * // Update or create a Account
     * const account = await prisma.account.upsert({
     *   create: {
     *     // ... data to create a Account
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Account we want to update
     *   }
     * })
     */
    upsert<T extends accountUpsertArgs>(args: SelectSubset<T, accountUpsertArgs<ExtArgs>>): Prisma__accountClient<$Result.GetResult<Prisma.$accountPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Accounts.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {accountCountArgs} args - Arguments to filter Accounts to count.
     * @example
     * // Count the number of Accounts
     * const count = await prisma.account.count({
     *   where: {
     *     // ... the filter for the Accounts we want to count
     *   }
     * })
    **/
    count<T extends accountCountArgs>(
      args?: Subset<T, accountCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], AccountCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {AccountAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends AccountAggregateArgs>(args: Subset<T, AccountAggregateArgs>): Prisma.PrismaPromise<GetAccountAggregateType<T>>

    /**
     * Group by Account.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {accountGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends accountGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: accountGroupByArgs['orderBy'] }
        : { orderBy?: accountGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, accountGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAccountGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the account model
   */
  readonly fields: accountFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for account.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__accountClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the account model
   */
  interface accountFieldRefs {
    readonly id: FieldRef<"account", 'String'>
    readonly accountId: FieldRef<"account", 'String'>
    readonly providerId: FieldRef<"account", 'String'>
    readonly userId: FieldRef<"account", 'String'>
    readonly accessToken: FieldRef<"account", 'String'>
    readonly refreshToken: FieldRef<"account", 'String'>
    readonly idToken: FieldRef<"account", 'String'>
    readonly accessTokenExpiresAt: FieldRef<"account", 'DateTime'>
    readonly refreshTokenExpiresAt: FieldRef<"account", 'DateTime'>
    readonly scope: FieldRef<"account", 'String'>
    readonly password: FieldRef<"account", 'String'>
    readonly createdAt: FieldRef<"account", 'DateTime'>
    readonly updatedAt: FieldRef<"account", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * account findUnique
   */
  export type accountFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * Filter, which account to fetch.
     */
    where: accountWhereUniqueInput
  }

  /**
   * account findUniqueOrThrow
   */
  export type accountFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * Filter, which account to fetch.
     */
    where: accountWhereUniqueInput
  }

  /**
   * account findFirst
   */
  export type accountFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * Filter, which account to fetch.
     */
    where?: accountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of accounts to fetch.
     */
    orderBy?: accountOrderByWithRelationInput | accountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for accounts.
     */
    cursor?: accountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * account findFirstOrThrow
   */
  export type accountFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * Filter, which account to fetch.
     */
    where?: accountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of accounts to fetch.
     */
    orderBy?: accountOrderByWithRelationInput | accountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for accounts.
     */
    cursor?: accountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` accounts.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of accounts.
     */
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * account findMany
   */
  export type accountFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * Filter, which accounts to fetch.
     */
    where?: accountWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of accounts to fetch.
     */
    orderBy?: accountOrderByWithRelationInput | accountOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing accounts.
     */
    cursor?: accountWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` accounts from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` accounts.
     */
    skip?: number
    distinct?: AccountScalarFieldEnum | AccountScalarFieldEnum[]
  }

  /**
   * account create
   */
  export type accountCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * The data needed to create a account.
     */
    data: XOR<accountCreateInput, accountUncheckedCreateInput>
  }

  /**
   * account createMany
   */
  export type accountCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many accounts.
     */
    data: accountCreateManyInput | accountCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * account update
   */
  export type accountUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * The data needed to update a account.
     */
    data: XOR<accountUpdateInput, accountUncheckedUpdateInput>
    /**
     * Choose, which account to update.
     */
    where: accountWhereUniqueInput
  }

  /**
   * account updateMany
   */
  export type accountUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update accounts.
     */
    data: XOR<accountUpdateManyMutationInput, accountUncheckedUpdateManyInput>
    /**
     * Filter which accounts to update
     */
    where?: accountWhereInput
    /**
     * Limit how many accounts to update.
     */
    limit?: number
  }

  /**
   * account upsert
   */
  export type accountUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * The filter to search for the account to update in case it exists.
     */
    where: accountWhereUniqueInput
    /**
     * In case the account found by the `where` argument doesn't exist, create a new account with this data.
     */
    create: XOR<accountCreateInput, accountUncheckedCreateInput>
    /**
     * In case the account was found with the provided `where` argument, update it with this data.
     */
    update: XOR<accountUpdateInput, accountUncheckedUpdateInput>
  }

  /**
   * account delete
   */
  export type accountDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
    /**
     * Filter which account to delete.
     */
    where: accountWhereUniqueInput
  }

  /**
   * account deleteMany
   */
  export type accountDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which accounts to delete
     */
    where?: accountWhereInput
    /**
     * Limit how many accounts to delete.
     */
    limit?: number
  }

  /**
   * account without action
   */
  export type accountDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the account
     */
    select?: accountSelect<ExtArgs> | null
    /**
     * Omit specific fields from the account
     */
    omit?: accountOmit<ExtArgs> | null
  }


  /**
   * Model auth_sessions
   */

  export type AggregateAuth_sessions = {
    _count: Auth_sessionsCountAggregateOutputType | null
    _min: Auth_sessionsMinAggregateOutputType | null
    _max: Auth_sessionsMaxAggregateOutputType | null
  }

  export type Auth_sessionsMinAggregateOutputType = {
    id: string | null
    user_id: string | null
    expires_at: Date | null
    created_at: Date | null
  }

  export type Auth_sessionsMaxAggregateOutputType = {
    id: string | null
    user_id: string | null
    expires_at: Date | null
    created_at: Date | null
  }

  export type Auth_sessionsCountAggregateOutputType = {
    id: number
    user_id: number
    expires_at: number
    created_at: number
    _all: number
  }


  export type Auth_sessionsMinAggregateInputType = {
    id?: true
    user_id?: true
    expires_at?: true
    created_at?: true
  }

  export type Auth_sessionsMaxAggregateInputType = {
    id?: true
    user_id?: true
    expires_at?: true
    created_at?: true
  }

  export type Auth_sessionsCountAggregateInputType = {
    id?: true
    user_id?: true
    expires_at?: true
    created_at?: true
    _all?: true
  }

  export type Auth_sessionsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which auth_sessions to aggregate.
     */
    where?: auth_sessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of auth_sessions to fetch.
     */
    orderBy?: auth_sessionsOrderByWithRelationInput | auth_sessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: auth_sessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` auth_sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` auth_sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned auth_sessions
    **/
    _count?: true | Auth_sessionsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Auth_sessionsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Auth_sessionsMaxAggregateInputType
  }

  export type GetAuth_sessionsAggregateType<T extends Auth_sessionsAggregateArgs> = {
        [P in keyof T & keyof AggregateAuth_sessions]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuth_sessions[P]>
      : GetScalarType<T[P], AggregateAuth_sessions[P]>
  }




  export type auth_sessionsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: auth_sessionsWhereInput
    orderBy?: auth_sessionsOrderByWithAggregationInput | auth_sessionsOrderByWithAggregationInput[]
    by: Auth_sessionsScalarFieldEnum[] | Auth_sessionsScalarFieldEnum
    having?: auth_sessionsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Auth_sessionsCountAggregateInputType | true
    _min?: Auth_sessionsMinAggregateInputType
    _max?: Auth_sessionsMaxAggregateInputType
  }

  export type Auth_sessionsGroupByOutputType = {
    id: string
    user_id: string
    expires_at: Date
    created_at: Date | null
    _count: Auth_sessionsCountAggregateOutputType | null
    _min: Auth_sessionsMinAggregateOutputType | null
    _max: Auth_sessionsMaxAggregateOutputType | null
  }

  type GetAuth_sessionsGroupByPayload<T extends auth_sessionsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Auth_sessionsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Auth_sessionsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Auth_sessionsGroupByOutputType[P]>
            : GetScalarType<T[P], Auth_sessionsGroupByOutputType[P]>
        }
      >
    >


  export type auth_sessionsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    user_id?: boolean
    expires_at?: boolean
    created_at?: boolean
    auth_users?: boolean | auth_usersDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auth_sessions"]>



  export type auth_sessionsSelectScalar = {
    id?: boolean
    user_id?: boolean
    expires_at?: boolean
    created_at?: boolean
  }

  export type auth_sessionsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "user_id" | "expires_at" | "created_at", ExtArgs["result"]["auth_sessions"]>
  export type auth_sessionsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auth_users?: boolean | auth_usersDefaultArgs<ExtArgs>
  }

  export type $auth_sessionsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "auth_sessions"
    objects: {
      auth_users: Prisma.$auth_usersPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      user_id: string
      expires_at: Date
      created_at: Date | null
    }, ExtArgs["result"]["auth_sessions"]>
    composites: {}
  }

  type auth_sessionsGetPayload<S extends boolean | null | undefined | auth_sessionsDefaultArgs> = $Result.GetResult<Prisma.$auth_sessionsPayload, S>

  type auth_sessionsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<auth_sessionsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Auth_sessionsCountAggregateInputType | true
    }

  export interface auth_sessionsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['auth_sessions'], meta: { name: 'auth_sessions' } }
    /**
     * Find zero or one Auth_sessions that matches the filter.
     * @param {auth_sessionsFindUniqueArgs} args - Arguments to find a Auth_sessions
     * @example
     * // Get one Auth_sessions
     * const auth_sessions = await prisma.auth_sessions.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends auth_sessionsFindUniqueArgs>(args: SelectSubset<T, auth_sessionsFindUniqueArgs<ExtArgs>>): Prisma__auth_sessionsClient<$Result.GetResult<Prisma.$auth_sessionsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Auth_sessions that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {auth_sessionsFindUniqueOrThrowArgs} args - Arguments to find a Auth_sessions
     * @example
     * // Get one Auth_sessions
     * const auth_sessions = await prisma.auth_sessions.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends auth_sessionsFindUniqueOrThrowArgs>(args: SelectSubset<T, auth_sessionsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__auth_sessionsClient<$Result.GetResult<Prisma.$auth_sessionsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Auth_sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auth_sessionsFindFirstArgs} args - Arguments to find a Auth_sessions
     * @example
     * // Get one Auth_sessions
     * const auth_sessions = await prisma.auth_sessions.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends auth_sessionsFindFirstArgs>(args?: SelectSubset<T, auth_sessionsFindFirstArgs<ExtArgs>>): Prisma__auth_sessionsClient<$Result.GetResult<Prisma.$auth_sessionsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Auth_sessions that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auth_sessionsFindFirstOrThrowArgs} args - Arguments to find a Auth_sessions
     * @example
     * // Get one Auth_sessions
     * const auth_sessions = await prisma.auth_sessions.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends auth_sessionsFindFirstOrThrowArgs>(args?: SelectSubset<T, auth_sessionsFindFirstOrThrowArgs<ExtArgs>>): Prisma__auth_sessionsClient<$Result.GetResult<Prisma.$auth_sessionsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Auth_sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auth_sessionsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Auth_sessions
     * const auth_sessions = await prisma.auth_sessions.findMany()
     * 
     * // Get first 10 Auth_sessions
     * const auth_sessions = await prisma.auth_sessions.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auth_sessionsWithIdOnly = await prisma.auth_sessions.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends auth_sessionsFindManyArgs>(args?: SelectSubset<T, auth_sessionsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$auth_sessionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Auth_sessions.
     * @param {auth_sessionsCreateArgs} args - Arguments to create a Auth_sessions.
     * @example
     * // Create one Auth_sessions
     * const Auth_sessions = await prisma.auth_sessions.create({
     *   data: {
     *     // ... data to create a Auth_sessions
     *   }
     * })
     * 
     */
    create<T extends auth_sessionsCreateArgs>(args: SelectSubset<T, auth_sessionsCreateArgs<ExtArgs>>): Prisma__auth_sessionsClient<$Result.GetResult<Prisma.$auth_sessionsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Auth_sessions.
     * @param {auth_sessionsCreateManyArgs} args - Arguments to create many Auth_sessions.
     * @example
     * // Create many Auth_sessions
     * const auth_sessions = await prisma.auth_sessions.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends auth_sessionsCreateManyArgs>(args?: SelectSubset<T, auth_sessionsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Auth_sessions.
     * @param {auth_sessionsDeleteArgs} args - Arguments to delete one Auth_sessions.
     * @example
     * // Delete one Auth_sessions
     * const Auth_sessions = await prisma.auth_sessions.delete({
     *   where: {
     *     // ... filter to delete one Auth_sessions
     *   }
     * })
     * 
     */
    delete<T extends auth_sessionsDeleteArgs>(args: SelectSubset<T, auth_sessionsDeleteArgs<ExtArgs>>): Prisma__auth_sessionsClient<$Result.GetResult<Prisma.$auth_sessionsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Auth_sessions.
     * @param {auth_sessionsUpdateArgs} args - Arguments to update one Auth_sessions.
     * @example
     * // Update one Auth_sessions
     * const auth_sessions = await prisma.auth_sessions.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends auth_sessionsUpdateArgs>(args: SelectSubset<T, auth_sessionsUpdateArgs<ExtArgs>>): Prisma__auth_sessionsClient<$Result.GetResult<Prisma.$auth_sessionsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Auth_sessions.
     * @param {auth_sessionsDeleteManyArgs} args - Arguments to filter Auth_sessions to delete.
     * @example
     * // Delete a few Auth_sessions
     * const { count } = await prisma.auth_sessions.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends auth_sessionsDeleteManyArgs>(args?: SelectSubset<T, auth_sessionsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Auth_sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auth_sessionsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Auth_sessions
     * const auth_sessions = await prisma.auth_sessions.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends auth_sessionsUpdateManyArgs>(args: SelectSubset<T, auth_sessionsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Auth_sessions.
     * @param {auth_sessionsUpsertArgs} args - Arguments to update or create a Auth_sessions.
     * @example
     * // Update or create a Auth_sessions
     * const auth_sessions = await prisma.auth_sessions.upsert({
     *   create: {
     *     // ... data to create a Auth_sessions
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Auth_sessions we want to update
     *   }
     * })
     */
    upsert<T extends auth_sessionsUpsertArgs>(args: SelectSubset<T, auth_sessionsUpsertArgs<ExtArgs>>): Prisma__auth_sessionsClient<$Result.GetResult<Prisma.$auth_sessionsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Auth_sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auth_sessionsCountArgs} args - Arguments to filter Auth_sessions to count.
     * @example
     * // Count the number of Auth_sessions
     * const count = await prisma.auth_sessions.count({
     *   where: {
     *     // ... the filter for the Auth_sessions we want to count
     *   }
     * })
    **/
    count<T extends auth_sessionsCountArgs>(
      args?: Subset<T, auth_sessionsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Auth_sessionsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Auth_sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Auth_sessionsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Auth_sessionsAggregateArgs>(args: Subset<T, Auth_sessionsAggregateArgs>): Prisma.PrismaPromise<GetAuth_sessionsAggregateType<T>>

    /**
     * Group by Auth_sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auth_sessionsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends auth_sessionsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: auth_sessionsGroupByArgs['orderBy'] }
        : { orderBy?: auth_sessionsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, auth_sessionsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuth_sessionsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the auth_sessions model
   */
  readonly fields: auth_sessionsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for auth_sessions.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__auth_sessionsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    auth_users<T extends auth_usersDefaultArgs<ExtArgs> = {}>(args?: Subset<T, auth_usersDefaultArgs<ExtArgs>>): Prisma__auth_usersClient<$Result.GetResult<Prisma.$auth_usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the auth_sessions model
   */
  interface auth_sessionsFieldRefs {
    readonly id: FieldRef<"auth_sessions", 'String'>
    readonly user_id: FieldRef<"auth_sessions", 'String'>
    readonly expires_at: FieldRef<"auth_sessions", 'DateTime'>
    readonly created_at: FieldRef<"auth_sessions", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * auth_sessions findUnique
   */
  export type auth_sessionsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_sessions
     */
    select?: auth_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_sessions
     */
    omit?: auth_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_sessionsInclude<ExtArgs> | null
    /**
     * Filter, which auth_sessions to fetch.
     */
    where: auth_sessionsWhereUniqueInput
  }

  /**
   * auth_sessions findUniqueOrThrow
   */
  export type auth_sessionsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_sessions
     */
    select?: auth_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_sessions
     */
    omit?: auth_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_sessionsInclude<ExtArgs> | null
    /**
     * Filter, which auth_sessions to fetch.
     */
    where: auth_sessionsWhereUniqueInput
  }

  /**
   * auth_sessions findFirst
   */
  export type auth_sessionsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_sessions
     */
    select?: auth_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_sessions
     */
    omit?: auth_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_sessionsInclude<ExtArgs> | null
    /**
     * Filter, which auth_sessions to fetch.
     */
    where?: auth_sessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of auth_sessions to fetch.
     */
    orderBy?: auth_sessionsOrderByWithRelationInput | auth_sessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for auth_sessions.
     */
    cursor?: auth_sessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` auth_sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` auth_sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of auth_sessions.
     */
    distinct?: Auth_sessionsScalarFieldEnum | Auth_sessionsScalarFieldEnum[]
  }

  /**
   * auth_sessions findFirstOrThrow
   */
  export type auth_sessionsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_sessions
     */
    select?: auth_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_sessions
     */
    omit?: auth_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_sessionsInclude<ExtArgs> | null
    /**
     * Filter, which auth_sessions to fetch.
     */
    where?: auth_sessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of auth_sessions to fetch.
     */
    orderBy?: auth_sessionsOrderByWithRelationInput | auth_sessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for auth_sessions.
     */
    cursor?: auth_sessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` auth_sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` auth_sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of auth_sessions.
     */
    distinct?: Auth_sessionsScalarFieldEnum | Auth_sessionsScalarFieldEnum[]
  }

  /**
   * auth_sessions findMany
   */
  export type auth_sessionsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_sessions
     */
    select?: auth_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_sessions
     */
    omit?: auth_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_sessionsInclude<ExtArgs> | null
    /**
     * Filter, which auth_sessions to fetch.
     */
    where?: auth_sessionsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of auth_sessions to fetch.
     */
    orderBy?: auth_sessionsOrderByWithRelationInput | auth_sessionsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing auth_sessions.
     */
    cursor?: auth_sessionsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` auth_sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` auth_sessions.
     */
    skip?: number
    distinct?: Auth_sessionsScalarFieldEnum | Auth_sessionsScalarFieldEnum[]
  }

  /**
   * auth_sessions create
   */
  export type auth_sessionsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_sessions
     */
    select?: auth_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_sessions
     */
    omit?: auth_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_sessionsInclude<ExtArgs> | null
    /**
     * The data needed to create a auth_sessions.
     */
    data: XOR<auth_sessionsCreateInput, auth_sessionsUncheckedCreateInput>
  }

  /**
   * auth_sessions createMany
   */
  export type auth_sessionsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many auth_sessions.
     */
    data: auth_sessionsCreateManyInput | auth_sessionsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * auth_sessions update
   */
  export type auth_sessionsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_sessions
     */
    select?: auth_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_sessions
     */
    omit?: auth_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_sessionsInclude<ExtArgs> | null
    /**
     * The data needed to update a auth_sessions.
     */
    data: XOR<auth_sessionsUpdateInput, auth_sessionsUncheckedUpdateInput>
    /**
     * Choose, which auth_sessions to update.
     */
    where: auth_sessionsWhereUniqueInput
  }

  /**
   * auth_sessions updateMany
   */
  export type auth_sessionsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update auth_sessions.
     */
    data: XOR<auth_sessionsUpdateManyMutationInput, auth_sessionsUncheckedUpdateManyInput>
    /**
     * Filter which auth_sessions to update
     */
    where?: auth_sessionsWhereInput
    /**
     * Limit how many auth_sessions to update.
     */
    limit?: number
  }

  /**
   * auth_sessions upsert
   */
  export type auth_sessionsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_sessions
     */
    select?: auth_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_sessions
     */
    omit?: auth_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_sessionsInclude<ExtArgs> | null
    /**
     * The filter to search for the auth_sessions to update in case it exists.
     */
    where: auth_sessionsWhereUniqueInput
    /**
     * In case the auth_sessions found by the `where` argument doesn't exist, create a new auth_sessions with this data.
     */
    create: XOR<auth_sessionsCreateInput, auth_sessionsUncheckedCreateInput>
    /**
     * In case the auth_sessions was found with the provided `where` argument, update it with this data.
     */
    update: XOR<auth_sessionsUpdateInput, auth_sessionsUncheckedUpdateInput>
  }

  /**
   * auth_sessions delete
   */
  export type auth_sessionsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_sessions
     */
    select?: auth_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_sessions
     */
    omit?: auth_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_sessionsInclude<ExtArgs> | null
    /**
     * Filter which auth_sessions to delete.
     */
    where: auth_sessionsWhereUniqueInput
  }

  /**
   * auth_sessions deleteMany
   */
  export type auth_sessionsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which auth_sessions to delete
     */
    where?: auth_sessionsWhereInput
    /**
     * Limit how many auth_sessions to delete.
     */
    limit?: number
  }

  /**
   * auth_sessions without action
   */
  export type auth_sessionsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_sessions
     */
    select?: auth_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_sessions
     */
    omit?: auth_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_sessionsInclude<ExtArgs> | null
  }


  /**
   * Model auth_users
   */

  export type AggregateAuth_users = {
    _count: Auth_usersCountAggregateOutputType | null
    _min: Auth_usersMinAggregateOutputType | null
    _max: Auth_usersMaxAggregateOutputType | null
  }

  export type Auth_usersMinAggregateOutputType = {
    id: string | null
    email: string | null
    email_verified: boolean | null
    password: string | null
    name: string | null
    image: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Auth_usersMaxAggregateOutputType = {
    id: string | null
    email: string | null
    email_verified: boolean | null
    password: string | null
    name: string | null
    image: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type Auth_usersCountAggregateOutputType = {
    id: number
    email: number
    email_verified: number
    password: number
    name: number
    image: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type Auth_usersMinAggregateInputType = {
    id?: true
    email?: true
    email_verified?: true
    password?: true
    name?: true
    image?: true
    created_at?: true
    updated_at?: true
  }

  export type Auth_usersMaxAggregateInputType = {
    id?: true
    email?: true
    email_verified?: true
    password?: true
    name?: true
    image?: true
    created_at?: true
    updated_at?: true
  }

  export type Auth_usersCountAggregateInputType = {
    id?: true
    email?: true
    email_verified?: true
    password?: true
    name?: true
    image?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type Auth_usersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which auth_users to aggregate.
     */
    where?: auth_usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of auth_users to fetch.
     */
    orderBy?: auth_usersOrderByWithRelationInput | auth_usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: auth_usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` auth_users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` auth_users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned auth_users
    **/
    _count?: true | Auth_usersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Auth_usersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Auth_usersMaxAggregateInputType
  }

  export type GetAuth_usersAggregateType<T extends Auth_usersAggregateArgs> = {
        [P in keyof T & keyof AggregateAuth_users]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuth_users[P]>
      : GetScalarType<T[P], AggregateAuth_users[P]>
  }




  export type auth_usersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: auth_usersWhereInput
    orderBy?: auth_usersOrderByWithAggregationInput | auth_usersOrderByWithAggregationInput[]
    by: Auth_usersScalarFieldEnum[] | Auth_usersScalarFieldEnum
    having?: auth_usersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Auth_usersCountAggregateInputType | true
    _min?: Auth_usersMinAggregateInputType
    _max?: Auth_usersMaxAggregateInputType
  }

  export type Auth_usersGroupByOutputType = {
    id: string
    email: string
    email_verified: boolean | null
    password: string | null
    name: string | null
    image: string | null
    created_at: Date | null
    updated_at: Date | null
    _count: Auth_usersCountAggregateOutputType | null
    _min: Auth_usersMinAggregateOutputType | null
    _max: Auth_usersMaxAggregateOutputType | null
  }

  type GetAuth_usersGroupByPayload<T extends auth_usersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Auth_usersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Auth_usersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Auth_usersGroupByOutputType[P]>
            : GetScalarType<T[P], Auth_usersGroupByOutputType[P]>
        }
      >
    >


  export type auth_usersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    email_verified?: boolean
    password?: boolean
    name?: boolean
    image?: boolean
    created_at?: boolean
    updated_at?: boolean
    auth_sessions?: boolean | auth_users$auth_sessionsArgs<ExtArgs>
    _count?: boolean | Auth_usersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["auth_users"]>



  export type auth_usersSelectScalar = {
    id?: boolean
    email?: boolean
    email_verified?: boolean
    password?: boolean
    name?: boolean
    image?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type auth_usersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "email_verified" | "password" | "name" | "image" | "created_at" | "updated_at", ExtArgs["result"]["auth_users"]>
  export type auth_usersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    auth_sessions?: boolean | auth_users$auth_sessionsArgs<ExtArgs>
    _count?: boolean | Auth_usersCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $auth_usersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "auth_users"
    objects: {
      auth_sessions: Prisma.$auth_sessionsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      email_verified: boolean | null
      password: string | null
      name: string | null
      image: string | null
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["auth_users"]>
    composites: {}
  }

  type auth_usersGetPayload<S extends boolean | null | undefined | auth_usersDefaultArgs> = $Result.GetResult<Prisma.$auth_usersPayload, S>

  type auth_usersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<auth_usersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Auth_usersCountAggregateInputType | true
    }

  export interface auth_usersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['auth_users'], meta: { name: 'auth_users' } }
    /**
     * Find zero or one Auth_users that matches the filter.
     * @param {auth_usersFindUniqueArgs} args - Arguments to find a Auth_users
     * @example
     * // Get one Auth_users
     * const auth_users = await prisma.auth_users.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends auth_usersFindUniqueArgs>(args: SelectSubset<T, auth_usersFindUniqueArgs<ExtArgs>>): Prisma__auth_usersClient<$Result.GetResult<Prisma.$auth_usersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Auth_users that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {auth_usersFindUniqueOrThrowArgs} args - Arguments to find a Auth_users
     * @example
     * // Get one Auth_users
     * const auth_users = await prisma.auth_users.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends auth_usersFindUniqueOrThrowArgs>(args: SelectSubset<T, auth_usersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__auth_usersClient<$Result.GetResult<Prisma.$auth_usersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Auth_users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auth_usersFindFirstArgs} args - Arguments to find a Auth_users
     * @example
     * // Get one Auth_users
     * const auth_users = await prisma.auth_users.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends auth_usersFindFirstArgs>(args?: SelectSubset<T, auth_usersFindFirstArgs<ExtArgs>>): Prisma__auth_usersClient<$Result.GetResult<Prisma.$auth_usersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Auth_users that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auth_usersFindFirstOrThrowArgs} args - Arguments to find a Auth_users
     * @example
     * // Get one Auth_users
     * const auth_users = await prisma.auth_users.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends auth_usersFindFirstOrThrowArgs>(args?: SelectSubset<T, auth_usersFindFirstOrThrowArgs<ExtArgs>>): Prisma__auth_usersClient<$Result.GetResult<Prisma.$auth_usersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Auth_users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auth_usersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Auth_users
     * const auth_users = await prisma.auth_users.findMany()
     * 
     * // Get first 10 Auth_users
     * const auth_users = await prisma.auth_users.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const auth_usersWithIdOnly = await prisma.auth_users.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends auth_usersFindManyArgs>(args?: SelectSubset<T, auth_usersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$auth_usersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Auth_users.
     * @param {auth_usersCreateArgs} args - Arguments to create a Auth_users.
     * @example
     * // Create one Auth_users
     * const Auth_users = await prisma.auth_users.create({
     *   data: {
     *     // ... data to create a Auth_users
     *   }
     * })
     * 
     */
    create<T extends auth_usersCreateArgs>(args: SelectSubset<T, auth_usersCreateArgs<ExtArgs>>): Prisma__auth_usersClient<$Result.GetResult<Prisma.$auth_usersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Auth_users.
     * @param {auth_usersCreateManyArgs} args - Arguments to create many Auth_users.
     * @example
     * // Create many Auth_users
     * const auth_users = await prisma.auth_users.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends auth_usersCreateManyArgs>(args?: SelectSubset<T, auth_usersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Auth_users.
     * @param {auth_usersDeleteArgs} args - Arguments to delete one Auth_users.
     * @example
     * // Delete one Auth_users
     * const Auth_users = await prisma.auth_users.delete({
     *   where: {
     *     // ... filter to delete one Auth_users
     *   }
     * })
     * 
     */
    delete<T extends auth_usersDeleteArgs>(args: SelectSubset<T, auth_usersDeleteArgs<ExtArgs>>): Prisma__auth_usersClient<$Result.GetResult<Prisma.$auth_usersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Auth_users.
     * @param {auth_usersUpdateArgs} args - Arguments to update one Auth_users.
     * @example
     * // Update one Auth_users
     * const auth_users = await prisma.auth_users.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends auth_usersUpdateArgs>(args: SelectSubset<T, auth_usersUpdateArgs<ExtArgs>>): Prisma__auth_usersClient<$Result.GetResult<Prisma.$auth_usersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Auth_users.
     * @param {auth_usersDeleteManyArgs} args - Arguments to filter Auth_users to delete.
     * @example
     * // Delete a few Auth_users
     * const { count } = await prisma.auth_users.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends auth_usersDeleteManyArgs>(args?: SelectSubset<T, auth_usersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Auth_users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auth_usersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Auth_users
     * const auth_users = await prisma.auth_users.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends auth_usersUpdateManyArgs>(args: SelectSubset<T, auth_usersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Auth_users.
     * @param {auth_usersUpsertArgs} args - Arguments to update or create a Auth_users.
     * @example
     * // Update or create a Auth_users
     * const auth_users = await prisma.auth_users.upsert({
     *   create: {
     *     // ... data to create a Auth_users
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Auth_users we want to update
     *   }
     * })
     */
    upsert<T extends auth_usersUpsertArgs>(args: SelectSubset<T, auth_usersUpsertArgs<ExtArgs>>): Prisma__auth_usersClient<$Result.GetResult<Prisma.$auth_usersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Auth_users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auth_usersCountArgs} args - Arguments to filter Auth_users to count.
     * @example
     * // Count the number of Auth_users
     * const count = await prisma.auth_users.count({
     *   where: {
     *     // ... the filter for the Auth_users we want to count
     *   }
     * })
    **/
    count<T extends auth_usersCountArgs>(
      args?: Subset<T, auth_usersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Auth_usersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Auth_users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Auth_usersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Auth_usersAggregateArgs>(args: Subset<T, Auth_usersAggregateArgs>): Prisma.PrismaPromise<GetAuth_usersAggregateType<T>>

    /**
     * Group by Auth_users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auth_usersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends auth_usersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: auth_usersGroupByArgs['orderBy'] }
        : { orderBy?: auth_usersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, auth_usersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuth_usersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the auth_users model
   */
  readonly fields: auth_usersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for auth_users.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__auth_usersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    auth_sessions<T extends auth_users$auth_sessionsArgs<ExtArgs> = {}>(args?: Subset<T, auth_users$auth_sessionsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$auth_sessionsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the auth_users model
   */
  interface auth_usersFieldRefs {
    readonly id: FieldRef<"auth_users", 'String'>
    readonly email: FieldRef<"auth_users", 'String'>
    readonly email_verified: FieldRef<"auth_users", 'Boolean'>
    readonly password: FieldRef<"auth_users", 'String'>
    readonly name: FieldRef<"auth_users", 'String'>
    readonly image: FieldRef<"auth_users", 'String'>
    readonly created_at: FieldRef<"auth_users", 'DateTime'>
    readonly updated_at: FieldRef<"auth_users", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * auth_users findUnique
   */
  export type auth_usersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_users
     */
    select?: auth_usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_users
     */
    omit?: auth_usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_usersInclude<ExtArgs> | null
    /**
     * Filter, which auth_users to fetch.
     */
    where: auth_usersWhereUniqueInput
  }

  /**
   * auth_users findUniqueOrThrow
   */
  export type auth_usersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_users
     */
    select?: auth_usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_users
     */
    omit?: auth_usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_usersInclude<ExtArgs> | null
    /**
     * Filter, which auth_users to fetch.
     */
    where: auth_usersWhereUniqueInput
  }

  /**
   * auth_users findFirst
   */
  export type auth_usersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_users
     */
    select?: auth_usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_users
     */
    omit?: auth_usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_usersInclude<ExtArgs> | null
    /**
     * Filter, which auth_users to fetch.
     */
    where?: auth_usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of auth_users to fetch.
     */
    orderBy?: auth_usersOrderByWithRelationInput | auth_usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for auth_users.
     */
    cursor?: auth_usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` auth_users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` auth_users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of auth_users.
     */
    distinct?: Auth_usersScalarFieldEnum | Auth_usersScalarFieldEnum[]
  }

  /**
   * auth_users findFirstOrThrow
   */
  export type auth_usersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_users
     */
    select?: auth_usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_users
     */
    omit?: auth_usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_usersInclude<ExtArgs> | null
    /**
     * Filter, which auth_users to fetch.
     */
    where?: auth_usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of auth_users to fetch.
     */
    orderBy?: auth_usersOrderByWithRelationInput | auth_usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for auth_users.
     */
    cursor?: auth_usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` auth_users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` auth_users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of auth_users.
     */
    distinct?: Auth_usersScalarFieldEnum | Auth_usersScalarFieldEnum[]
  }

  /**
   * auth_users findMany
   */
  export type auth_usersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_users
     */
    select?: auth_usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_users
     */
    omit?: auth_usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_usersInclude<ExtArgs> | null
    /**
     * Filter, which auth_users to fetch.
     */
    where?: auth_usersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of auth_users to fetch.
     */
    orderBy?: auth_usersOrderByWithRelationInput | auth_usersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing auth_users.
     */
    cursor?: auth_usersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` auth_users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` auth_users.
     */
    skip?: number
    distinct?: Auth_usersScalarFieldEnum | Auth_usersScalarFieldEnum[]
  }

  /**
   * auth_users create
   */
  export type auth_usersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_users
     */
    select?: auth_usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_users
     */
    omit?: auth_usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_usersInclude<ExtArgs> | null
    /**
     * The data needed to create a auth_users.
     */
    data: XOR<auth_usersCreateInput, auth_usersUncheckedCreateInput>
  }

  /**
   * auth_users createMany
   */
  export type auth_usersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many auth_users.
     */
    data: auth_usersCreateManyInput | auth_usersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * auth_users update
   */
  export type auth_usersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_users
     */
    select?: auth_usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_users
     */
    omit?: auth_usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_usersInclude<ExtArgs> | null
    /**
     * The data needed to update a auth_users.
     */
    data: XOR<auth_usersUpdateInput, auth_usersUncheckedUpdateInput>
    /**
     * Choose, which auth_users to update.
     */
    where: auth_usersWhereUniqueInput
  }

  /**
   * auth_users updateMany
   */
  export type auth_usersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update auth_users.
     */
    data: XOR<auth_usersUpdateManyMutationInput, auth_usersUncheckedUpdateManyInput>
    /**
     * Filter which auth_users to update
     */
    where?: auth_usersWhereInput
    /**
     * Limit how many auth_users to update.
     */
    limit?: number
  }

  /**
   * auth_users upsert
   */
  export type auth_usersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_users
     */
    select?: auth_usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_users
     */
    omit?: auth_usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_usersInclude<ExtArgs> | null
    /**
     * The filter to search for the auth_users to update in case it exists.
     */
    where: auth_usersWhereUniqueInput
    /**
     * In case the auth_users found by the `where` argument doesn't exist, create a new auth_users with this data.
     */
    create: XOR<auth_usersCreateInput, auth_usersUncheckedCreateInput>
    /**
     * In case the auth_users was found with the provided `where` argument, update it with this data.
     */
    update: XOR<auth_usersUpdateInput, auth_usersUncheckedUpdateInput>
  }

  /**
   * auth_users delete
   */
  export type auth_usersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_users
     */
    select?: auth_usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_users
     */
    omit?: auth_usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_usersInclude<ExtArgs> | null
    /**
     * Filter which auth_users to delete.
     */
    where: auth_usersWhereUniqueInput
  }

  /**
   * auth_users deleteMany
   */
  export type auth_usersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which auth_users to delete
     */
    where?: auth_usersWhereInput
    /**
     * Limit how many auth_users to delete.
     */
    limit?: number
  }

  /**
   * auth_users.auth_sessions
   */
  export type auth_users$auth_sessionsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_sessions
     */
    select?: auth_sessionsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_sessions
     */
    omit?: auth_sessionsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_sessionsInclude<ExtArgs> | null
    where?: auth_sessionsWhereInput
    orderBy?: auth_sessionsOrderByWithRelationInput | auth_sessionsOrderByWithRelationInput[]
    cursor?: auth_sessionsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Auth_sessionsScalarFieldEnum | Auth_sessionsScalarFieldEnum[]
  }

  /**
   * auth_users without action
   */
  export type auth_usersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_users
     */
    select?: auth_usersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_users
     */
    omit?: auth_usersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: auth_usersInclude<ExtArgs> | null
  }


  /**
   * Model auth_verification_tokens
   */

  export type AggregateAuth_verification_tokens = {
    _count: Auth_verification_tokensCountAggregateOutputType | null
    _min: Auth_verification_tokensMinAggregateOutputType | null
    _max: Auth_verification_tokensMaxAggregateOutputType | null
  }

  export type Auth_verification_tokensMinAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires_at: Date | null
  }

  export type Auth_verification_tokensMaxAggregateOutputType = {
    identifier: string | null
    token: string | null
    expires_at: Date | null
  }

  export type Auth_verification_tokensCountAggregateOutputType = {
    identifier: number
    token: number
    expires_at: number
    _all: number
  }


  export type Auth_verification_tokensMinAggregateInputType = {
    identifier?: true
    token?: true
    expires_at?: true
  }

  export type Auth_verification_tokensMaxAggregateInputType = {
    identifier?: true
    token?: true
    expires_at?: true
  }

  export type Auth_verification_tokensCountAggregateInputType = {
    identifier?: true
    token?: true
    expires_at?: true
    _all?: true
  }

  export type Auth_verification_tokensAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which auth_verification_tokens to aggregate.
     */
    where?: auth_verification_tokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of auth_verification_tokens to fetch.
     */
    orderBy?: auth_verification_tokensOrderByWithRelationInput | auth_verification_tokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: auth_verification_tokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` auth_verification_tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` auth_verification_tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned auth_verification_tokens
    **/
    _count?: true | Auth_verification_tokensCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Auth_verification_tokensMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Auth_verification_tokensMaxAggregateInputType
  }

  export type GetAuth_verification_tokensAggregateType<T extends Auth_verification_tokensAggregateArgs> = {
        [P in keyof T & keyof AggregateAuth_verification_tokens]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateAuth_verification_tokens[P]>
      : GetScalarType<T[P], AggregateAuth_verification_tokens[P]>
  }




  export type auth_verification_tokensGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: auth_verification_tokensWhereInput
    orderBy?: auth_verification_tokensOrderByWithAggregationInput | auth_verification_tokensOrderByWithAggregationInput[]
    by: Auth_verification_tokensScalarFieldEnum[] | Auth_verification_tokensScalarFieldEnum
    having?: auth_verification_tokensScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Auth_verification_tokensCountAggregateInputType | true
    _min?: Auth_verification_tokensMinAggregateInputType
    _max?: Auth_verification_tokensMaxAggregateInputType
  }

  export type Auth_verification_tokensGroupByOutputType = {
    identifier: string
    token: string
    expires_at: Date
    _count: Auth_verification_tokensCountAggregateOutputType | null
    _min: Auth_verification_tokensMinAggregateOutputType | null
    _max: Auth_verification_tokensMaxAggregateOutputType | null
  }

  type GetAuth_verification_tokensGroupByPayload<T extends auth_verification_tokensGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Auth_verification_tokensGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Auth_verification_tokensGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Auth_verification_tokensGroupByOutputType[P]>
            : GetScalarType<T[P], Auth_verification_tokensGroupByOutputType[P]>
        }
      >
    >


  export type auth_verification_tokensSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    identifier?: boolean
    token?: boolean
    expires_at?: boolean
  }, ExtArgs["result"]["auth_verification_tokens"]>



  export type auth_verification_tokensSelectScalar = {
    identifier?: boolean
    token?: boolean
    expires_at?: boolean
  }

  export type auth_verification_tokensOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"identifier" | "token" | "expires_at", ExtArgs["result"]["auth_verification_tokens"]>

  export type $auth_verification_tokensPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "auth_verification_tokens"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      identifier: string
      token: string
      expires_at: Date
    }, ExtArgs["result"]["auth_verification_tokens"]>
    composites: {}
  }

  type auth_verification_tokensGetPayload<S extends boolean | null | undefined | auth_verification_tokensDefaultArgs> = $Result.GetResult<Prisma.$auth_verification_tokensPayload, S>

  type auth_verification_tokensCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<auth_verification_tokensFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Auth_verification_tokensCountAggregateInputType | true
    }

  export interface auth_verification_tokensDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['auth_verification_tokens'], meta: { name: 'auth_verification_tokens' } }
    /**
     * Find zero or one Auth_verification_tokens that matches the filter.
     * @param {auth_verification_tokensFindUniqueArgs} args - Arguments to find a Auth_verification_tokens
     * @example
     * // Get one Auth_verification_tokens
     * const auth_verification_tokens = await prisma.auth_verification_tokens.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends auth_verification_tokensFindUniqueArgs>(args: SelectSubset<T, auth_verification_tokensFindUniqueArgs<ExtArgs>>): Prisma__auth_verification_tokensClient<$Result.GetResult<Prisma.$auth_verification_tokensPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Auth_verification_tokens that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {auth_verification_tokensFindUniqueOrThrowArgs} args - Arguments to find a Auth_verification_tokens
     * @example
     * // Get one Auth_verification_tokens
     * const auth_verification_tokens = await prisma.auth_verification_tokens.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends auth_verification_tokensFindUniqueOrThrowArgs>(args: SelectSubset<T, auth_verification_tokensFindUniqueOrThrowArgs<ExtArgs>>): Prisma__auth_verification_tokensClient<$Result.GetResult<Prisma.$auth_verification_tokensPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Auth_verification_tokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auth_verification_tokensFindFirstArgs} args - Arguments to find a Auth_verification_tokens
     * @example
     * // Get one Auth_verification_tokens
     * const auth_verification_tokens = await prisma.auth_verification_tokens.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends auth_verification_tokensFindFirstArgs>(args?: SelectSubset<T, auth_verification_tokensFindFirstArgs<ExtArgs>>): Prisma__auth_verification_tokensClient<$Result.GetResult<Prisma.$auth_verification_tokensPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Auth_verification_tokens that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auth_verification_tokensFindFirstOrThrowArgs} args - Arguments to find a Auth_verification_tokens
     * @example
     * // Get one Auth_verification_tokens
     * const auth_verification_tokens = await prisma.auth_verification_tokens.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends auth_verification_tokensFindFirstOrThrowArgs>(args?: SelectSubset<T, auth_verification_tokensFindFirstOrThrowArgs<ExtArgs>>): Prisma__auth_verification_tokensClient<$Result.GetResult<Prisma.$auth_verification_tokensPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Auth_verification_tokens that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auth_verification_tokensFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Auth_verification_tokens
     * const auth_verification_tokens = await prisma.auth_verification_tokens.findMany()
     * 
     * // Get first 10 Auth_verification_tokens
     * const auth_verification_tokens = await prisma.auth_verification_tokens.findMany({ take: 10 })
     * 
     * // Only select the `identifier`
     * const auth_verification_tokensWithIdentifierOnly = await prisma.auth_verification_tokens.findMany({ select: { identifier: true } })
     * 
     */
    findMany<T extends auth_verification_tokensFindManyArgs>(args?: SelectSubset<T, auth_verification_tokensFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$auth_verification_tokensPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Auth_verification_tokens.
     * @param {auth_verification_tokensCreateArgs} args - Arguments to create a Auth_verification_tokens.
     * @example
     * // Create one Auth_verification_tokens
     * const Auth_verification_tokens = await prisma.auth_verification_tokens.create({
     *   data: {
     *     // ... data to create a Auth_verification_tokens
     *   }
     * })
     * 
     */
    create<T extends auth_verification_tokensCreateArgs>(args: SelectSubset<T, auth_verification_tokensCreateArgs<ExtArgs>>): Prisma__auth_verification_tokensClient<$Result.GetResult<Prisma.$auth_verification_tokensPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Auth_verification_tokens.
     * @param {auth_verification_tokensCreateManyArgs} args - Arguments to create many Auth_verification_tokens.
     * @example
     * // Create many Auth_verification_tokens
     * const auth_verification_tokens = await prisma.auth_verification_tokens.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends auth_verification_tokensCreateManyArgs>(args?: SelectSubset<T, auth_verification_tokensCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Auth_verification_tokens.
     * @param {auth_verification_tokensDeleteArgs} args - Arguments to delete one Auth_verification_tokens.
     * @example
     * // Delete one Auth_verification_tokens
     * const Auth_verification_tokens = await prisma.auth_verification_tokens.delete({
     *   where: {
     *     // ... filter to delete one Auth_verification_tokens
     *   }
     * })
     * 
     */
    delete<T extends auth_verification_tokensDeleteArgs>(args: SelectSubset<T, auth_verification_tokensDeleteArgs<ExtArgs>>): Prisma__auth_verification_tokensClient<$Result.GetResult<Prisma.$auth_verification_tokensPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Auth_verification_tokens.
     * @param {auth_verification_tokensUpdateArgs} args - Arguments to update one Auth_verification_tokens.
     * @example
     * // Update one Auth_verification_tokens
     * const auth_verification_tokens = await prisma.auth_verification_tokens.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends auth_verification_tokensUpdateArgs>(args: SelectSubset<T, auth_verification_tokensUpdateArgs<ExtArgs>>): Prisma__auth_verification_tokensClient<$Result.GetResult<Prisma.$auth_verification_tokensPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Auth_verification_tokens.
     * @param {auth_verification_tokensDeleteManyArgs} args - Arguments to filter Auth_verification_tokens to delete.
     * @example
     * // Delete a few Auth_verification_tokens
     * const { count } = await prisma.auth_verification_tokens.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends auth_verification_tokensDeleteManyArgs>(args?: SelectSubset<T, auth_verification_tokensDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Auth_verification_tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auth_verification_tokensUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Auth_verification_tokens
     * const auth_verification_tokens = await prisma.auth_verification_tokens.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends auth_verification_tokensUpdateManyArgs>(args: SelectSubset<T, auth_verification_tokensUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Auth_verification_tokens.
     * @param {auth_verification_tokensUpsertArgs} args - Arguments to update or create a Auth_verification_tokens.
     * @example
     * // Update or create a Auth_verification_tokens
     * const auth_verification_tokens = await prisma.auth_verification_tokens.upsert({
     *   create: {
     *     // ... data to create a Auth_verification_tokens
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Auth_verification_tokens we want to update
     *   }
     * })
     */
    upsert<T extends auth_verification_tokensUpsertArgs>(args: SelectSubset<T, auth_verification_tokensUpsertArgs<ExtArgs>>): Prisma__auth_verification_tokensClient<$Result.GetResult<Prisma.$auth_verification_tokensPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Auth_verification_tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auth_verification_tokensCountArgs} args - Arguments to filter Auth_verification_tokens to count.
     * @example
     * // Count the number of Auth_verification_tokens
     * const count = await prisma.auth_verification_tokens.count({
     *   where: {
     *     // ... the filter for the Auth_verification_tokens we want to count
     *   }
     * })
    **/
    count<T extends auth_verification_tokensCountArgs>(
      args?: Subset<T, auth_verification_tokensCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Auth_verification_tokensCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Auth_verification_tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Auth_verification_tokensAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Auth_verification_tokensAggregateArgs>(args: Subset<T, Auth_verification_tokensAggregateArgs>): Prisma.PrismaPromise<GetAuth_verification_tokensAggregateType<T>>

    /**
     * Group by Auth_verification_tokens.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {auth_verification_tokensGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends auth_verification_tokensGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: auth_verification_tokensGroupByArgs['orderBy'] }
        : { orderBy?: auth_verification_tokensGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, auth_verification_tokensGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetAuth_verification_tokensGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the auth_verification_tokens model
   */
  readonly fields: auth_verification_tokensFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for auth_verification_tokens.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__auth_verification_tokensClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the auth_verification_tokens model
   */
  interface auth_verification_tokensFieldRefs {
    readonly identifier: FieldRef<"auth_verification_tokens", 'String'>
    readonly token: FieldRef<"auth_verification_tokens", 'String'>
    readonly expires_at: FieldRef<"auth_verification_tokens", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * auth_verification_tokens findUnique
   */
  export type auth_verification_tokensFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_verification_tokens
     */
    select?: auth_verification_tokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_verification_tokens
     */
    omit?: auth_verification_tokensOmit<ExtArgs> | null
    /**
     * Filter, which auth_verification_tokens to fetch.
     */
    where: auth_verification_tokensWhereUniqueInput
  }

  /**
   * auth_verification_tokens findUniqueOrThrow
   */
  export type auth_verification_tokensFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_verification_tokens
     */
    select?: auth_verification_tokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_verification_tokens
     */
    omit?: auth_verification_tokensOmit<ExtArgs> | null
    /**
     * Filter, which auth_verification_tokens to fetch.
     */
    where: auth_verification_tokensWhereUniqueInput
  }

  /**
   * auth_verification_tokens findFirst
   */
  export type auth_verification_tokensFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_verification_tokens
     */
    select?: auth_verification_tokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_verification_tokens
     */
    omit?: auth_verification_tokensOmit<ExtArgs> | null
    /**
     * Filter, which auth_verification_tokens to fetch.
     */
    where?: auth_verification_tokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of auth_verification_tokens to fetch.
     */
    orderBy?: auth_verification_tokensOrderByWithRelationInput | auth_verification_tokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for auth_verification_tokens.
     */
    cursor?: auth_verification_tokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` auth_verification_tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` auth_verification_tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of auth_verification_tokens.
     */
    distinct?: Auth_verification_tokensScalarFieldEnum | Auth_verification_tokensScalarFieldEnum[]
  }

  /**
   * auth_verification_tokens findFirstOrThrow
   */
  export type auth_verification_tokensFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_verification_tokens
     */
    select?: auth_verification_tokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_verification_tokens
     */
    omit?: auth_verification_tokensOmit<ExtArgs> | null
    /**
     * Filter, which auth_verification_tokens to fetch.
     */
    where?: auth_verification_tokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of auth_verification_tokens to fetch.
     */
    orderBy?: auth_verification_tokensOrderByWithRelationInput | auth_verification_tokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for auth_verification_tokens.
     */
    cursor?: auth_verification_tokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` auth_verification_tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` auth_verification_tokens.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of auth_verification_tokens.
     */
    distinct?: Auth_verification_tokensScalarFieldEnum | Auth_verification_tokensScalarFieldEnum[]
  }

  /**
   * auth_verification_tokens findMany
   */
  export type auth_verification_tokensFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_verification_tokens
     */
    select?: auth_verification_tokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_verification_tokens
     */
    omit?: auth_verification_tokensOmit<ExtArgs> | null
    /**
     * Filter, which auth_verification_tokens to fetch.
     */
    where?: auth_verification_tokensWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of auth_verification_tokens to fetch.
     */
    orderBy?: auth_verification_tokensOrderByWithRelationInput | auth_verification_tokensOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing auth_verification_tokens.
     */
    cursor?: auth_verification_tokensWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` auth_verification_tokens from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` auth_verification_tokens.
     */
    skip?: number
    distinct?: Auth_verification_tokensScalarFieldEnum | Auth_verification_tokensScalarFieldEnum[]
  }

  /**
   * auth_verification_tokens create
   */
  export type auth_verification_tokensCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_verification_tokens
     */
    select?: auth_verification_tokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_verification_tokens
     */
    omit?: auth_verification_tokensOmit<ExtArgs> | null
    /**
     * The data needed to create a auth_verification_tokens.
     */
    data: XOR<auth_verification_tokensCreateInput, auth_verification_tokensUncheckedCreateInput>
  }

  /**
   * auth_verification_tokens createMany
   */
  export type auth_verification_tokensCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many auth_verification_tokens.
     */
    data: auth_verification_tokensCreateManyInput | auth_verification_tokensCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * auth_verification_tokens update
   */
  export type auth_verification_tokensUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_verification_tokens
     */
    select?: auth_verification_tokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_verification_tokens
     */
    omit?: auth_verification_tokensOmit<ExtArgs> | null
    /**
     * The data needed to update a auth_verification_tokens.
     */
    data: XOR<auth_verification_tokensUpdateInput, auth_verification_tokensUncheckedUpdateInput>
    /**
     * Choose, which auth_verification_tokens to update.
     */
    where: auth_verification_tokensWhereUniqueInput
  }

  /**
   * auth_verification_tokens updateMany
   */
  export type auth_verification_tokensUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update auth_verification_tokens.
     */
    data: XOR<auth_verification_tokensUpdateManyMutationInput, auth_verification_tokensUncheckedUpdateManyInput>
    /**
     * Filter which auth_verification_tokens to update
     */
    where?: auth_verification_tokensWhereInput
    /**
     * Limit how many auth_verification_tokens to update.
     */
    limit?: number
  }

  /**
   * auth_verification_tokens upsert
   */
  export type auth_verification_tokensUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_verification_tokens
     */
    select?: auth_verification_tokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_verification_tokens
     */
    omit?: auth_verification_tokensOmit<ExtArgs> | null
    /**
     * The filter to search for the auth_verification_tokens to update in case it exists.
     */
    where: auth_verification_tokensWhereUniqueInput
    /**
     * In case the auth_verification_tokens found by the `where` argument doesn't exist, create a new auth_verification_tokens with this data.
     */
    create: XOR<auth_verification_tokensCreateInput, auth_verification_tokensUncheckedCreateInput>
    /**
     * In case the auth_verification_tokens was found with the provided `where` argument, update it with this data.
     */
    update: XOR<auth_verification_tokensUpdateInput, auth_verification_tokensUncheckedUpdateInput>
  }

  /**
   * auth_verification_tokens delete
   */
  export type auth_verification_tokensDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_verification_tokens
     */
    select?: auth_verification_tokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_verification_tokens
     */
    omit?: auth_verification_tokensOmit<ExtArgs> | null
    /**
     * Filter which auth_verification_tokens to delete.
     */
    where: auth_verification_tokensWhereUniqueInput
  }

  /**
   * auth_verification_tokens deleteMany
   */
  export type auth_verification_tokensDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which auth_verification_tokens to delete
     */
    where?: auth_verification_tokensWhereInput
    /**
     * Limit how many auth_verification_tokens to delete.
     */
    limit?: number
  }

  /**
   * auth_verification_tokens without action
   */
  export type auth_verification_tokensDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the auth_verification_tokens
     */
    select?: auth_verification_tokensSelect<ExtArgs> | null
    /**
     * Omit specific fields from the auth_verification_tokens
     */
    omit?: auth_verification_tokensOmit<ExtArgs> | null
  }


  /**
   * Model folders
   */

  export type AggregateFolders = {
    _count: FoldersCountAggregateOutputType | null
    _min: FoldersMinAggregateOutputType | null
    _max: FoldersMaxAggregateOutputType | null
  }

  export type FoldersMinAggregateOutputType = {
    id: string | null
    name: string | null
    user_id: string | null
    parent_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type FoldersMaxAggregateOutputType = {
    id: string | null
    name: string | null
    user_id: string | null
    parent_id: string | null
    created_at: Date | null
    updated_at: Date | null
  }

  export type FoldersCountAggregateOutputType = {
    id: number
    name: number
    user_id: number
    parent_id: number
    created_at: number
    updated_at: number
    _all: number
  }


  export type FoldersMinAggregateInputType = {
    id?: true
    name?: true
    user_id?: true
    parent_id?: true
    created_at?: true
    updated_at?: true
  }

  export type FoldersMaxAggregateInputType = {
    id?: true
    name?: true
    user_id?: true
    parent_id?: true
    created_at?: true
    updated_at?: true
  }

  export type FoldersCountAggregateInputType = {
    id?: true
    name?: true
    user_id?: true
    parent_id?: true
    created_at?: true
    updated_at?: true
    _all?: true
  }

  export type FoldersAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which folders to aggregate.
     */
    where?: foldersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of folders to fetch.
     */
    orderBy?: foldersOrderByWithRelationInput | foldersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: foldersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` folders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` folders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned folders
    **/
    _count?: true | FoldersCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: FoldersMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: FoldersMaxAggregateInputType
  }

  export type GetFoldersAggregateType<T extends FoldersAggregateArgs> = {
        [P in keyof T & keyof AggregateFolders]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateFolders[P]>
      : GetScalarType<T[P], AggregateFolders[P]>
  }




  export type foldersGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: foldersWhereInput
    orderBy?: foldersOrderByWithAggregationInput | foldersOrderByWithAggregationInput[]
    by: FoldersScalarFieldEnum[] | FoldersScalarFieldEnum
    having?: foldersScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: FoldersCountAggregateInputType | true
    _min?: FoldersMinAggregateInputType
    _max?: FoldersMaxAggregateInputType
  }

  export type FoldersGroupByOutputType = {
    id: string
    name: string
    user_id: string
    parent_id: string | null
    created_at: Date | null
    updated_at: Date | null
    _count: FoldersCountAggregateOutputType | null
    _min: FoldersMinAggregateOutputType | null
    _max: FoldersMaxAggregateOutputType | null
  }

  type GetFoldersGroupByPayload<T extends foldersGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<FoldersGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof FoldersGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], FoldersGroupByOutputType[P]>
            : GetScalarType<T[P], FoldersGroupByOutputType[P]>
        }
      >
    >


  export type foldersSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    user_id?: boolean
    parent_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    folders?: boolean | folders$foldersArgs<ExtArgs>
    other_folders?: boolean | folders$other_foldersArgs<ExtArgs>
    user?: boolean | userDefaultArgs<ExtArgs>
    notes?: boolean | folders$notesArgs<ExtArgs>
    _count?: boolean | FoldersCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["folders"]>



  export type foldersSelectScalar = {
    id?: boolean
    name?: boolean
    user_id?: boolean
    parent_id?: boolean
    created_at?: boolean
    updated_at?: boolean
  }

  export type foldersOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "user_id" | "parent_id" | "created_at" | "updated_at", ExtArgs["result"]["folders"]>
  export type foldersInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    folders?: boolean | folders$foldersArgs<ExtArgs>
    other_folders?: boolean | folders$other_foldersArgs<ExtArgs>
    user?: boolean | userDefaultArgs<ExtArgs>
    notes?: boolean | folders$notesArgs<ExtArgs>
    _count?: boolean | FoldersCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $foldersPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "folders"
    objects: {
      folders: Prisma.$foldersPayload<ExtArgs> | null
      other_folders: Prisma.$foldersPayload<ExtArgs>[]
      user: Prisma.$userPayload<ExtArgs>
      notes: Prisma.$notesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      user_id: string
      parent_id: string | null
      created_at: Date | null
      updated_at: Date | null
    }, ExtArgs["result"]["folders"]>
    composites: {}
  }

  type foldersGetPayload<S extends boolean | null | undefined | foldersDefaultArgs> = $Result.GetResult<Prisma.$foldersPayload, S>

  type foldersCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<foldersFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: FoldersCountAggregateInputType | true
    }

  export interface foldersDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['folders'], meta: { name: 'folders' } }
    /**
     * Find zero or one Folders that matches the filter.
     * @param {foldersFindUniqueArgs} args - Arguments to find a Folders
     * @example
     * // Get one Folders
     * const folders = await prisma.folders.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends foldersFindUniqueArgs>(args: SelectSubset<T, foldersFindUniqueArgs<ExtArgs>>): Prisma__foldersClient<$Result.GetResult<Prisma.$foldersPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Folders that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {foldersFindUniqueOrThrowArgs} args - Arguments to find a Folders
     * @example
     * // Get one Folders
     * const folders = await prisma.folders.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends foldersFindUniqueOrThrowArgs>(args: SelectSubset<T, foldersFindUniqueOrThrowArgs<ExtArgs>>): Prisma__foldersClient<$Result.GetResult<Prisma.$foldersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Folders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {foldersFindFirstArgs} args - Arguments to find a Folders
     * @example
     * // Get one Folders
     * const folders = await prisma.folders.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends foldersFindFirstArgs>(args?: SelectSubset<T, foldersFindFirstArgs<ExtArgs>>): Prisma__foldersClient<$Result.GetResult<Prisma.$foldersPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Folders that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {foldersFindFirstOrThrowArgs} args - Arguments to find a Folders
     * @example
     * // Get one Folders
     * const folders = await prisma.folders.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends foldersFindFirstOrThrowArgs>(args?: SelectSubset<T, foldersFindFirstOrThrowArgs<ExtArgs>>): Prisma__foldersClient<$Result.GetResult<Prisma.$foldersPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Folders that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {foldersFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Folders
     * const folders = await prisma.folders.findMany()
     * 
     * // Get first 10 Folders
     * const folders = await prisma.folders.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const foldersWithIdOnly = await prisma.folders.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends foldersFindManyArgs>(args?: SelectSubset<T, foldersFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$foldersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Folders.
     * @param {foldersCreateArgs} args - Arguments to create a Folders.
     * @example
     * // Create one Folders
     * const Folders = await prisma.folders.create({
     *   data: {
     *     // ... data to create a Folders
     *   }
     * })
     * 
     */
    create<T extends foldersCreateArgs>(args: SelectSubset<T, foldersCreateArgs<ExtArgs>>): Prisma__foldersClient<$Result.GetResult<Prisma.$foldersPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Folders.
     * @param {foldersCreateManyArgs} args - Arguments to create many Folders.
     * @example
     * // Create many Folders
     * const folders = await prisma.folders.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends foldersCreateManyArgs>(args?: SelectSubset<T, foldersCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Folders.
     * @param {foldersDeleteArgs} args - Arguments to delete one Folders.
     * @example
     * // Delete one Folders
     * const Folders = await prisma.folders.delete({
     *   where: {
     *     // ... filter to delete one Folders
     *   }
     * })
     * 
     */
    delete<T extends foldersDeleteArgs>(args: SelectSubset<T, foldersDeleteArgs<ExtArgs>>): Prisma__foldersClient<$Result.GetResult<Prisma.$foldersPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Folders.
     * @param {foldersUpdateArgs} args - Arguments to update one Folders.
     * @example
     * // Update one Folders
     * const folders = await prisma.folders.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends foldersUpdateArgs>(args: SelectSubset<T, foldersUpdateArgs<ExtArgs>>): Prisma__foldersClient<$Result.GetResult<Prisma.$foldersPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Folders.
     * @param {foldersDeleteManyArgs} args - Arguments to filter Folders to delete.
     * @example
     * // Delete a few Folders
     * const { count } = await prisma.folders.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends foldersDeleteManyArgs>(args?: SelectSubset<T, foldersDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Folders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {foldersUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Folders
     * const folders = await prisma.folders.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends foldersUpdateManyArgs>(args: SelectSubset<T, foldersUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Folders.
     * @param {foldersUpsertArgs} args - Arguments to update or create a Folders.
     * @example
     * // Update or create a Folders
     * const folders = await prisma.folders.upsert({
     *   create: {
     *     // ... data to create a Folders
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Folders we want to update
     *   }
     * })
     */
    upsert<T extends foldersUpsertArgs>(args: SelectSubset<T, foldersUpsertArgs<ExtArgs>>): Prisma__foldersClient<$Result.GetResult<Prisma.$foldersPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Folders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {foldersCountArgs} args - Arguments to filter Folders to count.
     * @example
     * // Count the number of Folders
     * const count = await prisma.folders.count({
     *   where: {
     *     // ... the filter for the Folders we want to count
     *   }
     * })
    **/
    count<T extends foldersCountArgs>(
      args?: Subset<T, foldersCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], FoldersCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Folders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {FoldersAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends FoldersAggregateArgs>(args: Subset<T, FoldersAggregateArgs>): Prisma.PrismaPromise<GetFoldersAggregateType<T>>

    /**
     * Group by Folders.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {foldersGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends foldersGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: foldersGroupByArgs['orderBy'] }
        : { orderBy?: foldersGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, foldersGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetFoldersGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the folders model
   */
  readonly fields: foldersFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for folders.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__foldersClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    folders<T extends folders$foldersArgs<ExtArgs> = {}>(args?: Subset<T, folders$foldersArgs<ExtArgs>>): Prisma__foldersClient<$Result.GetResult<Prisma.$foldersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    other_folders<T extends folders$other_foldersArgs<ExtArgs> = {}>(args?: Subset<T, folders$other_foldersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$foldersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    notes<T extends folders$notesArgs<ExtArgs> = {}>(args?: Subset<T, folders$notesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$notesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the folders model
   */
  interface foldersFieldRefs {
    readonly id: FieldRef<"folders", 'String'>
    readonly name: FieldRef<"folders", 'String'>
    readonly user_id: FieldRef<"folders", 'String'>
    readonly parent_id: FieldRef<"folders", 'String'>
    readonly created_at: FieldRef<"folders", 'DateTime'>
    readonly updated_at: FieldRef<"folders", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * folders findUnique
   */
  export type foldersFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the folders
     */
    select?: foldersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the folders
     */
    omit?: foldersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: foldersInclude<ExtArgs> | null
    /**
     * Filter, which folders to fetch.
     */
    where: foldersWhereUniqueInput
  }

  /**
   * folders findUniqueOrThrow
   */
  export type foldersFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the folders
     */
    select?: foldersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the folders
     */
    omit?: foldersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: foldersInclude<ExtArgs> | null
    /**
     * Filter, which folders to fetch.
     */
    where: foldersWhereUniqueInput
  }

  /**
   * folders findFirst
   */
  export type foldersFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the folders
     */
    select?: foldersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the folders
     */
    omit?: foldersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: foldersInclude<ExtArgs> | null
    /**
     * Filter, which folders to fetch.
     */
    where?: foldersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of folders to fetch.
     */
    orderBy?: foldersOrderByWithRelationInput | foldersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for folders.
     */
    cursor?: foldersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` folders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` folders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of folders.
     */
    distinct?: FoldersScalarFieldEnum | FoldersScalarFieldEnum[]
  }

  /**
   * folders findFirstOrThrow
   */
  export type foldersFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the folders
     */
    select?: foldersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the folders
     */
    omit?: foldersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: foldersInclude<ExtArgs> | null
    /**
     * Filter, which folders to fetch.
     */
    where?: foldersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of folders to fetch.
     */
    orderBy?: foldersOrderByWithRelationInput | foldersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for folders.
     */
    cursor?: foldersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` folders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` folders.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of folders.
     */
    distinct?: FoldersScalarFieldEnum | FoldersScalarFieldEnum[]
  }

  /**
   * folders findMany
   */
  export type foldersFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the folders
     */
    select?: foldersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the folders
     */
    omit?: foldersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: foldersInclude<ExtArgs> | null
    /**
     * Filter, which folders to fetch.
     */
    where?: foldersWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of folders to fetch.
     */
    orderBy?: foldersOrderByWithRelationInput | foldersOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing folders.
     */
    cursor?: foldersWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` folders from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` folders.
     */
    skip?: number
    distinct?: FoldersScalarFieldEnum | FoldersScalarFieldEnum[]
  }

  /**
   * folders create
   */
  export type foldersCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the folders
     */
    select?: foldersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the folders
     */
    omit?: foldersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: foldersInclude<ExtArgs> | null
    /**
     * The data needed to create a folders.
     */
    data: XOR<foldersCreateInput, foldersUncheckedCreateInput>
  }

  /**
   * folders createMany
   */
  export type foldersCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many folders.
     */
    data: foldersCreateManyInput | foldersCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * folders update
   */
  export type foldersUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the folders
     */
    select?: foldersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the folders
     */
    omit?: foldersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: foldersInclude<ExtArgs> | null
    /**
     * The data needed to update a folders.
     */
    data: XOR<foldersUpdateInput, foldersUncheckedUpdateInput>
    /**
     * Choose, which folders to update.
     */
    where: foldersWhereUniqueInput
  }

  /**
   * folders updateMany
   */
  export type foldersUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update folders.
     */
    data: XOR<foldersUpdateManyMutationInput, foldersUncheckedUpdateManyInput>
    /**
     * Filter which folders to update
     */
    where?: foldersWhereInput
    /**
     * Limit how many folders to update.
     */
    limit?: number
  }

  /**
   * folders upsert
   */
  export type foldersUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the folders
     */
    select?: foldersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the folders
     */
    omit?: foldersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: foldersInclude<ExtArgs> | null
    /**
     * The filter to search for the folders to update in case it exists.
     */
    where: foldersWhereUniqueInput
    /**
     * In case the folders found by the `where` argument doesn't exist, create a new folders with this data.
     */
    create: XOR<foldersCreateInput, foldersUncheckedCreateInput>
    /**
     * In case the folders was found with the provided `where` argument, update it with this data.
     */
    update: XOR<foldersUpdateInput, foldersUncheckedUpdateInput>
  }

  /**
   * folders delete
   */
  export type foldersDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the folders
     */
    select?: foldersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the folders
     */
    omit?: foldersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: foldersInclude<ExtArgs> | null
    /**
     * Filter which folders to delete.
     */
    where: foldersWhereUniqueInput
  }

  /**
   * folders deleteMany
   */
  export type foldersDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which folders to delete
     */
    where?: foldersWhereInput
    /**
     * Limit how many folders to delete.
     */
    limit?: number
  }

  /**
   * folders.folders
   */
  export type folders$foldersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the folders
     */
    select?: foldersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the folders
     */
    omit?: foldersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: foldersInclude<ExtArgs> | null
    where?: foldersWhereInput
  }

  /**
   * folders.other_folders
   */
  export type folders$other_foldersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the folders
     */
    select?: foldersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the folders
     */
    omit?: foldersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: foldersInclude<ExtArgs> | null
    where?: foldersWhereInput
    orderBy?: foldersOrderByWithRelationInput | foldersOrderByWithRelationInput[]
    cursor?: foldersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FoldersScalarFieldEnum | FoldersScalarFieldEnum[]
  }

  /**
   * folders.notes
   */
  export type folders$notesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notes
     */
    select?: notesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notes
     */
    omit?: notesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notesInclude<ExtArgs> | null
    where?: notesWhereInput
    orderBy?: notesOrderByWithRelationInput | notesOrderByWithRelationInput[]
    cursor?: notesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotesScalarFieldEnum | NotesScalarFieldEnum[]
  }

  /**
   * folders without action
   */
  export type foldersDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the folders
     */
    select?: foldersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the folders
     */
    omit?: foldersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: foldersInclude<ExtArgs> | null
  }


  /**
   * Model note_tags
   */

  export type AggregateNote_tags = {
    _count: Note_tagsCountAggregateOutputType | null
    _min: Note_tagsMinAggregateOutputType | null
    _max: Note_tagsMaxAggregateOutputType | null
  }

  export type Note_tagsMinAggregateOutputType = {
    note_id: string | null
    tag_id: string | null
  }

  export type Note_tagsMaxAggregateOutputType = {
    note_id: string | null
    tag_id: string | null
  }

  export type Note_tagsCountAggregateOutputType = {
    note_id: number
    tag_id: number
    _all: number
  }


  export type Note_tagsMinAggregateInputType = {
    note_id?: true
    tag_id?: true
  }

  export type Note_tagsMaxAggregateInputType = {
    note_id?: true
    tag_id?: true
  }

  export type Note_tagsCountAggregateInputType = {
    note_id?: true
    tag_id?: true
    _all?: true
  }

  export type Note_tagsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which note_tags to aggregate.
     */
    where?: note_tagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of note_tags to fetch.
     */
    orderBy?: note_tagsOrderByWithRelationInput | note_tagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: note_tagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` note_tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` note_tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned note_tags
    **/
    _count?: true | Note_tagsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Note_tagsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Note_tagsMaxAggregateInputType
  }

  export type GetNote_tagsAggregateType<T extends Note_tagsAggregateArgs> = {
        [P in keyof T & keyof AggregateNote_tags]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNote_tags[P]>
      : GetScalarType<T[P], AggregateNote_tags[P]>
  }




  export type note_tagsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: note_tagsWhereInput
    orderBy?: note_tagsOrderByWithAggregationInput | note_tagsOrderByWithAggregationInput[]
    by: Note_tagsScalarFieldEnum[] | Note_tagsScalarFieldEnum
    having?: note_tagsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Note_tagsCountAggregateInputType | true
    _min?: Note_tagsMinAggregateInputType
    _max?: Note_tagsMaxAggregateInputType
  }

  export type Note_tagsGroupByOutputType = {
    note_id: string
    tag_id: string
    _count: Note_tagsCountAggregateOutputType | null
    _min: Note_tagsMinAggregateOutputType | null
    _max: Note_tagsMaxAggregateOutputType | null
  }

  type GetNote_tagsGroupByPayload<T extends note_tagsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Note_tagsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Note_tagsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Note_tagsGroupByOutputType[P]>
            : GetScalarType<T[P], Note_tagsGroupByOutputType[P]>
        }
      >
    >


  export type note_tagsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    note_id?: boolean
    tag_id?: boolean
    notes?: boolean | notesDefaultArgs<ExtArgs>
    tags?: boolean | tagsDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["note_tags"]>



  export type note_tagsSelectScalar = {
    note_id?: boolean
    tag_id?: boolean
  }

  export type note_tagsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"note_id" | "tag_id", ExtArgs["result"]["note_tags"]>
  export type note_tagsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notes?: boolean | notesDefaultArgs<ExtArgs>
    tags?: boolean | tagsDefaultArgs<ExtArgs>
  }

  export type $note_tagsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "note_tags"
    objects: {
      notes: Prisma.$notesPayload<ExtArgs>
      tags: Prisma.$tagsPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      note_id: string
      tag_id: string
    }, ExtArgs["result"]["note_tags"]>
    composites: {}
  }

  type note_tagsGetPayload<S extends boolean | null | undefined | note_tagsDefaultArgs> = $Result.GetResult<Prisma.$note_tagsPayload, S>

  type note_tagsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<note_tagsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Note_tagsCountAggregateInputType | true
    }

  export interface note_tagsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['note_tags'], meta: { name: 'note_tags' } }
    /**
     * Find zero or one Note_tags that matches the filter.
     * @param {note_tagsFindUniqueArgs} args - Arguments to find a Note_tags
     * @example
     * // Get one Note_tags
     * const note_tags = await prisma.note_tags.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends note_tagsFindUniqueArgs>(args: SelectSubset<T, note_tagsFindUniqueArgs<ExtArgs>>): Prisma__note_tagsClient<$Result.GetResult<Prisma.$note_tagsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Note_tags that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {note_tagsFindUniqueOrThrowArgs} args - Arguments to find a Note_tags
     * @example
     * // Get one Note_tags
     * const note_tags = await prisma.note_tags.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends note_tagsFindUniqueOrThrowArgs>(args: SelectSubset<T, note_tagsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__note_tagsClient<$Result.GetResult<Prisma.$note_tagsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Note_tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {note_tagsFindFirstArgs} args - Arguments to find a Note_tags
     * @example
     * // Get one Note_tags
     * const note_tags = await prisma.note_tags.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends note_tagsFindFirstArgs>(args?: SelectSubset<T, note_tagsFindFirstArgs<ExtArgs>>): Prisma__note_tagsClient<$Result.GetResult<Prisma.$note_tagsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Note_tags that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {note_tagsFindFirstOrThrowArgs} args - Arguments to find a Note_tags
     * @example
     * // Get one Note_tags
     * const note_tags = await prisma.note_tags.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends note_tagsFindFirstOrThrowArgs>(args?: SelectSubset<T, note_tagsFindFirstOrThrowArgs<ExtArgs>>): Prisma__note_tagsClient<$Result.GetResult<Prisma.$note_tagsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Note_tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {note_tagsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Note_tags
     * const note_tags = await prisma.note_tags.findMany()
     * 
     * // Get first 10 Note_tags
     * const note_tags = await prisma.note_tags.findMany({ take: 10 })
     * 
     * // Only select the `note_id`
     * const note_tagsWithNote_idOnly = await prisma.note_tags.findMany({ select: { note_id: true } })
     * 
     */
    findMany<T extends note_tagsFindManyArgs>(args?: SelectSubset<T, note_tagsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$note_tagsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Note_tags.
     * @param {note_tagsCreateArgs} args - Arguments to create a Note_tags.
     * @example
     * // Create one Note_tags
     * const Note_tags = await prisma.note_tags.create({
     *   data: {
     *     // ... data to create a Note_tags
     *   }
     * })
     * 
     */
    create<T extends note_tagsCreateArgs>(args: SelectSubset<T, note_tagsCreateArgs<ExtArgs>>): Prisma__note_tagsClient<$Result.GetResult<Prisma.$note_tagsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Note_tags.
     * @param {note_tagsCreateManyArgs} args - Arguments to create many Note_tags.
     * @example
     * // Create many Note_tags
     * const note_tags = await prisma.note_tags.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends note_tagsCreateManyArgs>(args?: SelectSubset<T, note_tagsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Note_tags.
     * @param {note_tagsDeleteArgs} args - Arguments to delete one Note_tags.
     * @example
     * // Delete one Note_tags
     * const Note_tags = await prisma.note_tags.delete({
     *   where: {
     *     // ... filter to delete one Note_tags
     *   }
     * })
     * 
     */
    delete<T extends note_tagsDeleteArgs>(args: SelectSubset<T, note_tagsDeleteArgs<ExtArgs>>): Prisma__note_tagsClient<$Result.GetResult<Prisma.$note_tagsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Note_tags.
     * @param {note_tagsUpdateArgs} args - Arguments to update one Note_tags.
     * @example
     * // Update one Note_tags
     * const note_tags = await prisma.note_tags.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends note_tagsUpdateArgs>(args: SelectSubset<T, note_tagsUpdateArgs<ExtArgs>>): Prisma__note_tagsClient<$Result.GetResult<Prisma.$note_tagsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Note_tags.
     * @param {note_tagsDeleteManyArgs} args - Arguments to filter Note_tags to delete.
     * @example
     * // Delete a few Note_tags
     * const { count } = await prisma.note_tags.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends note_tagsDeleteManyArgs>(args?: SelectSubset<T, note_tagsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Note_tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {note_tagsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Note_tags
     * const note_tags = await prisma.note_tags.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends note_tagsUpdateManyArgs>(args: SelectSubset<T, note_tagsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Note_tags.
     * @param {note_tagsUpsertArgs} args - Arguments to update or create a Note_tags.
     * @example
     * // Update or create a Note_tags
     * const note_tags = await prisma.note_tags.upsert({
     *   create: {
     *     // ... data to create a Note_tags
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Note_tags we want to update
     *   }
     * })
     */
    upsert<T extends note_tagsUpsertArgs>(args: SelectSubset<T, note_tagsUpsertArgs<ExtArgs>>): Prisma__note_tagsClient<$Result.GetResult<Prisma.$note_tagsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Note_tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {note_tagsCountArgs} args - Arguments to filter Note_tags to count.
     * @example
     * // Count the number of Note_tags
     * const count = await prisma.note_tags.count({
     *   where: {
     *     // ... the filter for the Note_tags we want to count
     *   }
     * })
    **/
    count<T extends note_tagsCountArgs>(
      args?: Subset<T, note_tagsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Note_tagsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Note_tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Note_tagsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Note_tagsAggregateArgs>(args: Subset<T, Note_tagsAggregateArgs>): Prisma.PrismaPromise<GetNote_tagsAggregateType<T>>

    /**
     * Group by Note_tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {note_tagsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends note_tagsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: note_tagsGroupByArgs['orderBy'] }
        : { orderBy?: note_tagsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, note_tagsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNote_tagsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the note_tags model
   */
  readonly fields: note_tagsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for note_tags.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__note_tagsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    notes<T extends notesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, notesDefaultArgs<ExtArgs>>): Prisma__notesClient<$Result.GetResult<Prisma.$notesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    tags<T extends tagsDefaultArgs<ExtArgs> = {}>(args?: Subset<T, tagsDefaultArgs<ExtArgs>>): Prisma__tagsClient<$Result.GetResult<Prisma.$tagsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the note_tags model
   */
  interface note_tagsFieldRefs {
    readonly note_id: FieldRef<"note_tags", 'String'>
    readonly tag_id: FieldRef<"note_tags", 'String'>
  }
    

  // Custom InputTypes
  /**
   * note_tags findUnique
   */
  export type note_tagsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the note_tags
     */
    select?: note_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the note_tags
     */
    omit?: note_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: note_tagsInclude<ExtArgs> | null
    /**
     * Filter, which note_tags to fetch.
     */
    where: note_tagsWhereUniqueInput
  }

  /**
   * note_tags findUniqueOrThrow
   */
  export type note_tagsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the note_tags
     */
    select?: note_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the note_tags
     */
    omit?: note_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: note_tagsInclude<ExtArgs> | null
    /**
     * Filter, which note_tags to fetch.
     */
    where: note_tagsWhereUniqueInput
  }

  /**
   * note_tags findFirst
   */
  export type note_tagsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the note_tags
     */
    select?: note_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the note_tags
     */
    omit?: note_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: note_tagsInclude<ExtArgs> | null
    /**
     * Filter, which note_tags to fetch.
     */
    where?: note_tagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of note_tags to fetch.
     */
    orderBy?: note_tagsOrderByWithRelationInput | note_tagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for note_tags.
     */
    cursor?: note_tagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` note_tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` note_tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of note_tags.
     */
    distinct?: Note_tagsScalarFieldEnum | Note_tagsScalarFieldEnum[]
  }

  /**
   * note_tags findFirstOrThrow
   */
  export type note_tagsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the note_tags
     */
    select?: note_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the note_tags
     */
    omit?: note_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: note_tagsInclude<ExtArgs> | null
    /**
     * Filter, which note_tags to fetch.
     */
    where?: note_tagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of note_tags to fetch.
     */
    orderBy?: note_tagsOrderByWithRelationInput | note_tagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for note_tags.
     */
    cursor?: note_tagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` note_tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` note_tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of note_tags.
     */
    distinct?: Note_tagsScalarFieldEnum | Note_tagsScalarFieldEnum[]
  }

  /**
   * note_tags findMany
   */
  export type note_tagsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the note_tags
     */
    select?: note_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the note_tags
     */
    omit?: note_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: note_tagsInclude<ExtArgs> | null
    /**
     * Filter, which note_tags to fetch.
     */
    where?: note_tagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of note_tags to fetch.
     */
    orderBy?: note_tagsOrderByWithRelationInput | note_tagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing note_tags.
     */
    cursor?: note_tagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` note_tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` note_tags.
     */
    skip?: number
    distinct?: Note_tagsScalarFieldEnum | Note_tagsScalarFieldEnum[]
  }

  /**
   * note_tags create
   */
  export type note_tagsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the note_tags
     */
    select?: note_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the note_tags
     */
    omit?: note_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: note_tagsInclude<ExtArgs> | null
    /**
     * The data needed to create a note_tags.
     */
    data: XOR<note_tagsCreateInput, note_tagsUncheckedCreateInput>
  }

  /**
   * note_tags createMany
   */
  export type note_tagsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many note_tags.
     */
    data: note_tagsCreateManyInput | note_tagsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * note_tags update
   */
  export type note_tagsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the note_tags
     */
    select?: note_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the note_tags
     */
    omit?: note_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: note_tagsInclude<ExtArgs> | null
    /**
     * The data needed to update a note_tags.
     */
    data: XOR<note_tagsUpdateInput, note_tagsUncheckedUpdateInput>
    /**
     * Choose, which note_tags to update.
     */
    where: note_tagsWhereUniqueInput
  }

  /**
   * note_tags updateMany
   */
  export type note_tagsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update note_tags.
     */
    data: XOR<note_tagsUpdateManyMutationInput, note_tagsUncheckedUpdateManyInput>
    /**
     * Filter which note_tags to update
     */
    where?: note_tagsWhereInput
    /**
     * Limit how many note_tags to update.
     */
    limit?: number
  }

  /**
   * note_tags upsert
   */
  export type note_tagsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the note_tags
     */
    select?: note_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the note_tags
     */
    omit?: note_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: note_tagsInclude<ExtArgs> | null
    /**
     * The filter to search for the note_tags to update in case it exists.
     */
    where: note_tagsWhereUniqueInput
    /**
     * In case the note_tags found by the `where` argument doesn't exist, create a new note_tags with this data.
     */
    create: XOR<note_tagsCreateInput, note_tagsUncheckedCreateInput>
    /**
     * In case the note_tags was found with the provided `where` argument, update it with this data.
     */
    update: XOR<note_tagsUpdateInput, note_tagsUncheckedUpdateInput>
  }

  /**
   * note_tags delete
   */
  export type note_tagsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the note_tags
     */
    select?: note_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the note_tags
     */
    omit?: note_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: note_tagsInclude<ExtArgs> | null
    /**
     * Filter which note_tags to delete.
     */
    where: note_tagsWhereUniqueInput
  }

  /**
   * note_tags deleteMany
   */
  export type note_tagsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which note_tags to delete
     */
    where?: note_tagsWhereInput
    /**
     * Limit how many note_tags to delete.
     */
    limit?: number
  }

  /**
   * note_tags without action
   */
  export type note_tagsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the note_tags
     */
    select?: note_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the note_tags
     */
    omit?: note_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: note_tagsInclude<ExtArgs> | null
  }


  /**
   * Model notes
   */

  export type AggregateNotes = {
    _count: NotesCountAggregateOutputType | null
    _min: NotesMinAggregateOutputType | null
    _max: NotesMaxAggregateOutputType | null
  }

  export type NotesMinAggregateOutputType = {
    id: string | null
    name: string | null
    content: string | null
    user_id: string | null
    parent_id: string | null
    created_at: Date | null
    updated_at: Date | null
    is_pinned: boolean | null
    is_public: boolean | null
  }

  export type NotesMaxAggregateOutputType = {
    id: string | null
    name: string | null
    content: string | null
    user_id: string | null
    parent_id: string | null
    created_at: Date | null
    updated_at: Date | null
    is_pinned: boolean | null
    is_public: boolean | null
  }

  export type NotesCountAggregateOutputType = {
    id: number
    name: number
    content: number
    user_id: number
    parent_id: number
    created_at: number
    updated_at: number
    is_pinned: number
    is_public: number
    _all: number
  }


  export type NotesMinAggregateInputType = {
    id?: true
    name?: true
    content?: true
    user_id?: true
    parent_id?: true
    created_at?: true
    updated_at?: true
    is_pinned?: true
    is_public?: true
  }

  export type NotesMaxAggregateInputType = {
    id?: true
    name?: true
    content?: true
    user_id?: true
    parent_id?: true
    created_at?: true
    updated_at?: true
    is_pinned?: true
    is_public?: true
  }

  export type NotesCountAggregateInputType = {
    id?: true
    name?: true
    content?: true
    user_id?: true
    parent_id?: true
    created_at?: true
    updated_at?: true
    is_pinned?: true
    is_public?: true
    _all?: true
  }

  export type NotesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which notes to aggregate.
     */
    where?: notesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of notes to fetch.
     */
    orderBy?: notesOrderByWithRelationInput | notesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: notesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` notes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned notes
    **/
    _count?: true | NotesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: NotesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: NotesMaxAggregateInputType
  }

  export type GetNotesAggregateType<T extends NotesAggregateArgs> = {
        [P in keyof T & keyof AggregateNotes]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateNotes[P]>
      : GetScalarType<T[P], AggregateNotes[P]>
  }




  export type notesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: notesWhereInput
    orderBy?: notesOrderByWithAggregationInput | notesOrderByWithAggregationInput[]
    by: NotesScalarFieldEnum[] | NotesScalarFieldEnum
    having?: notesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: NotesCountAggregateInputType | true
    _min?: NotesMinAggregateInputType
    _max?: NotesMaxAggregateInputType
  }

  export type NotesGroupByOutputType = {
    id: string
    name: string
    content: string | null
    user_id: string
    parent_id: string | null
    created_at: Date | null
    updated_at: Date | null
    is_pinned: boolean | null
    is_public: boolean | null
    _count: NotesCountAggregateOutputType | null
    _min: NotesMinAggregateOutputType | null
    _max: NotesMaxAggregateOutputType | null
  }

  type GetNotesGroupByPayload<T extends notesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<NotesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof NotesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], NotesGroupByOutputType[P]>
            : GetScalarType<T[P], NotesGroupByOutputType[P]>
        }
      >
    >


  export type notesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    content?: boolean
    user_id?: boolean
    parent_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_pinned?: boolean
    is_public?: boolean
    note_tags?: boolean | notes$note_tagsArgs<ExtArgs>
    folders?: boolean | notes$foldersArgs<ExtArgs>
    user?: boolean | userDefaultArgs<ExtArgs>
    shares?: boolean | notes$sharesArgs<ExtArgs>
    _count?: boolean | NotesCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["notes"]>



  export type notesSelectScalar = {
    id?: boolean
    name?: boolean
    content?: boolean
    user_id?: boolean
    parent_id?: boolean
    created_at?: boolean
    updated_at?: boolean
    is_pinned?: boolean
    is_public?: boolean
  }

  export type notesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "content" | "user_id" | "parent_id" | "created_at" | "updated_at" | "is_pinned" | "is_public", ExtArgs["result"]["notes"]>
  export type notesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    note_tags?: boolean | notes$note_tagsArgs<ExtArgs>
    folders?: boolean | notes$foldersArgs<ExtArgs>
    user?: boolean | userDefaultArgs<ExtArgs>
    shares?: boolean | notes$sharesArgs<ExtArgs>
    _count?: boolean | NotesCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $notesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "notes"
    objects: {
      note_tags: Prisma.$note_tagsPayload<ExtArgs>[]
      folders: Prisma.$foldersPayload<ExtArgs> | null
      user: Prisma.$userPayload<ExtArgs>
      shares: Prisma.$sharesPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      content: string | null
      user_id: string
      parent_id: string | null
      created_at: Date | null
      updated_at: Date | null
      is_pinned: boolean | null
      is_public: boolean | null
    }, ExtArgs["result"]["notes"]>
    composites: {}
  }

  type notesGetPayload<S extends boolean | null | undefined | notesDefaultArgs> = $Result.GetResult<Prisma.$notesPayload, S>

  type notesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<notesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: NotesCountAggregateInputType | true
    }

  export interface notesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['notes'], meta: { name: 'notes' } }
    /**
     * Find zero or one Notes that matches the filter.
     * @param {notesFindUniqueArgs} args - Arguments to find a Notes
     * @example
     * // Get one Notes
     * const notes = await prisma.notes.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends notesFindUniqueArgs>(args: SelectSubset<T, notesFindUniqueArgs<ExtArgs>>): Prisma__notesClient<$Result.GetResult<Prisma.$notesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Notes that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {notesFindUniqueOrThrowArgs} args - Arguments to find a Notes
     * @example
     * // Get one Notes
     * const notes = await prisma.notes.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends notesFindUniqueOrThrowArgs>(args: SelectSubset<T, notesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__notesClient<$Result.GetResult<Prisma.$notesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notesFindFirstArgs} args - Arguments to find a Notes
     * @example
     * // Get one Notes
     * const notes = await prisma.notes.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends notesFindFirstArgs>(args?: SelectSubset<T, notesFindFirstArgs<ExtArgs>>): Prisma__notesClient<$Result.GetResult<Prisma.$notesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Notes that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notesFindFirstOrThrowArgs} args - Arguments to find a Notes
     * @example
     * // Get one Notes
     * const notes = await prisma.notes.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends notesFindFirstOrThrowArgs>(args?: SelectSubset<T, notesFindFirstOrThrowArgs<ExtArgs>>): Prisma__notesClient<$Result.GetResult<Prisma.$notesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Notes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Notes
     * const notes = await prisma.notes.findMany()
     * 
     * // Get first 10 Notes
     * const notes = await prisma.notes.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const notesWithIdOnly = await prisma.notes.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends notesFindManyArgs>(args?: SelectSubset<T, notesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$notesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Notes.
     * @param {notesCreateArgs} args - Arguments to create a Notes.
     * @example
     * // Create one Notes
     * const Notes = await prisma.notes.create({
     *   data: {
     *     // ... data to create a Notes
     *   }
     * })
     * 
     */
    create<T extends notesCreateArgs>(args: SelectSubset<T, notesCreateArgs<ExtArgs>>): Prisma__notesClient<$Result.GetResult<Prisma.$notesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Notes.
     * @param {notesCreateManyArgs} args - Arguments to create many Notes.
     * @example
     * // Create many Notes
     * const notes = await prisma.notes.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends notesCreateManyArgs>(args?: SelectSubset<T, notesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Notes.
     * @param {notesDeleteArgs} args - Arguments to delete one Notes.
     * @example
     * // Delete one Notes
     * const Notes = await prisma.notes.delete({
     *   where: {
     *     // ... filter to delete one Notes
     *   }
     * })
     * 
     */
    delete<T extends notesDeleteArgs>(args: SelectSubset<T, notesDeleteArgs<ExtArgs>>): Prisma__notesClient<$Result.GetResult<Prisma.$notesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Notes.
     * @param {notesUpdateArgs} args - Arguments to update one Notes.
     * @example
     * // Update one Notes
     * const notes = await prisma.notes.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends notesUpdateArgs>(args: SelectSubset<T, notesUpdateArgs<ExtArgs>>): Prisma__notesClient<$Result.GetResult<Prisma.$notesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Notes.
     * @param {notesDeleteManyArgs} args - Arguments to filter Notes to delete.
     * @example
     * // Delete a few Notes
     * const { count } = await prisma.notes.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends notesDeleteManyArgs>(args?: SelectSubset<T, notesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Notes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Notes
     * const notes = await prisma.notes.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends notesUpdateManyArgs>(args: SelectSubset<T, notesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Notes.
     * @param {notesUpsertArgs} args - Arguments to update or create a Notes.
     * @example
     * // Update or create a Notes
     * const notes = await prisma.notes.upsert({
     *   create: {
     *     // ... data to create a Notes
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Notes we want to update
     *   }
     * })
     */
    upsert<T extends notesUpsertArgs>(args: SelectSubset<T, notesUpsertArgs<ExtArgs>>): Prisma__notesClient<$Result.GetResult<Prisma.$notesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Notes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notesCountArgs} args - Arguments to filter Notes to count.
     * @example
     * // Count the number of Notes
     * const count = await prisma.notes.count({
     *   where: {
     *     // ... the filter for the Notes we want to count
     *   }
     * })
    **/
    count<T extends notesCountArgs>(
      args?: Subset<T, notesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], NotesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Notes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NotesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends NotesAggregateArgs>(args: Subset<T, NotesAggregateArgs>): Prisma.PrismaPromise<GetNotesAggregateType<T>>

    /**
     * Group by Notes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {notesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends notesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: notesGroupByArgs['orderBy'] }
        : { orderBy?: notesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, notesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNotesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the notes model
   */
  readonly fields: notesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for notes.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__notesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    note_tags<T extends notes$note_tagsArgs<ExtArgs> = {}>(args?: Subset<T, notes$note_tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$note_tagsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    folders<T extends notes$foldersArgs<ExtArgs> = {}>(args?: Subset<T, notes$foldersArgs<ExtArgs>>): Prisma__foldersClient<$Result.GetResult<Prisma.$foldersPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    shares<T extends notes$sharesArgs<ExtArgs> = {}>(args?: Subset<T, notes$sharesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sharesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the notes model
   */
  interface notesFieldRefs {
    readonly id: FieldRef<"notes", 'String'>
    readonly name: FieldRef<"notes", 'String'>
    readonly content: FieldRef<"notes", 'String'>
    readonly user_id: FieldRef<"notes", 'String'>
    readonly parent_id: FieldRef<"notes", 'String'>
    readonly created_at: FieldRef<"notes", 'DateTime'>
    readonly updated_at: FieldRef<"notes", 'DateTime'>
    readonly is_pinned: FieldRef<"notes", 'Boolean'>
    readonly is_public: FieldRef<"notes", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * notes findUnique
   */
  export type notesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notes
     */
    select?: notesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notes
     */
    omit?: notesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notesInclude<ExtArgs> | null
    /**
     * Filter, which notes to fetch.
     */
    where: notesWhereUniqueInput
  }

  /**
   * notes findUniqueOrThrow
   */
  export type notesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notes
     */
    select?: notesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notes
     */
    omit?: notesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notesInclude<ExtArgs> | null
    /**
     * Filter, which notes to fetch.
     */
    where: notesWhereUniqueInput
  }

  /**
   * notes findFirst
   */
  export type notesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notes
     */
    select?: notesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notes
     */
    omit?: notesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notesInclude<ExtArgs> | null
    /**
     * Filter, which notes to fetch.
     */
    where?: notesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of notes to fetch.
     */
    orderBy?: notesOrderByWithRelationInput | notesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for notes.
     */
    cursor?: notesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` notes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of notes.
     */
    distinct?: NotesScalarFieldEnum | NotesScalarFieldEnum[]
  }

  /**
   * notes findFirstOrThrow
   */
  export type notesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notes
     */
    select?: notesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notes
     */
    omit?: notesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notesInclude<ExtArgs> | null
    /**
     * Filter, which notes to fetch.
     */
    where?: notesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of notes to fetch.
     */
    orderBy?: notesOrderByWithRelationInput | notesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for notes.
     */
    cursor?: notesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` notes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of notes.
     */
    distinct?: NotesScalarFieldEnum | NotesScalarFieldEnum[]
  }

  /**
   * notes findMany
   */
  export type notesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notes
     */
    select?: notesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notes
     */
    omit?: notesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notesInclude<ExtArgs> | null
    /**
     * Filter, which notes to fetch.
     */
    where?: notesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of notes to fetch.
     */
    orderBy?: notesOrderByWithRelationInput | notesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing notes.
     */
    cursor?: notesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` notes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` notes.
     */
    skip?: number
    distinct?: NotesScalarFieldEnum | NotesScalarFieldEnum[]
  }

  /**
   * notes create
   */
  export type notesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notes
     */
    select?: notesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notes
     */
    omit?: notesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notesInclude<ExtArgs> | null
    /**
     * The data needed to create a notes.
     */
    data: XOR<notesCreateInput, notesUncheckedCreateInput>
  }

  /**
   * notes createMany
   */
  export type notesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many notes.
     */
    data: notesCreateManyInput | notesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * notes update
   */
  export type notesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notes
     */
    select?: notesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notes
     */
    omit?: notesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notesInclude<ExtArgs> | null
    /**
     * The data needed to update a notes.
     */
    data: XOR<notesUpdateInput, notesUncheckedUpdateInput>
    /**
     * Choose, which notes to update.
     */
    where: notesWhereUniqueInput
  }

  /**
   * notes updateMany
   */
  export type notesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update notes.
     */
    data: XOR<notesUpdateManyMutationInput, notesUncheckedUpdateManyInput>
    /**
     * Filter which notes to update
     */
    where?: notesWhereInput
    /**
     * Limit how many notes to update.
     */
    limit?: number
  }

  /**
   * notes upsert
   */
  export type notesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notes
     */
    select?: notesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notes
     */
    omit?: notesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notesInclude<ExtArgs> | null
    /**
     * The filter to search for the notes to update in case it exists.
     */
    where: notesWhereUniqueInput
    /**
     * In case the notes found by the `where` argument doesn't exist, create a new notes with this data.
     */
    create: XOR<notesCreateInput, notesUncheckedCreateInput>
    /**
     * In case the notes was found with the provided `where` argument, update it with this data.
     */
    update: XOR<notesUpdateInput, notesUncheckedUpdateInput>
  }

  /**
   * notes delete
   */
  export type notesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notes
     */
    select?: notesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notes
     */
    omit?: notesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notesInclude<ExtArgs> | null
    /**
     * Filter which notes to delete.
     */
    where: notesWhereUniqueInput
  }

  /**
   * notes deleteMany
   */
  export type notesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which notes to delete
     */
    where?: notesWhereInput
    /**
     * Limit how many notes to delete.
     */
    limit?: number
  }

  /**
   * notes.note_tags
   */
  export type notes$note_tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the note_tags
     */
    select?: note_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the note_tags
     */
    omit?: note_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: note_tagsInclude<ExtArgs> | null
    where?: note_tagsWhereInput
    orderBy?: note_tagsOrderByWithRelationInput | note_tagsOrderByWithRelationInput[]
    cursor?: note_tagsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Note_tagsScalarFieldEnum | Note_tagsScalarFieldEnum[]
  }

  /**
   * notes.folders
   */
  export type notes$foldersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the folders
     */
    select?: foldersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the folders
     */
    omit?: foldersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: foldersInclude<ExtArgs> | null
    where?: foldersWhereInput
  }

  /**
   * notes.shares
   */
  export type notes$sharesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shares
     */
    select?: sharesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the shares
     */
    omit?: sharesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sharesInclude<ExtArgs> | null
    where?: sharesWhereInput
    orderBy?: sharesOrderByWithRelationInput | sharesOrderByWithRelationInput[]
    cursor?: sharesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SharesScalarFieldEnum | SharesScalarFieldEnum[]
  }

  /**
   * notes without action
   */
  export type notesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notes
     */
    select?: notesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notes
     */
    omit?: notesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notesInclude<ExtArgs> | null
  }


  /**
   * Model pending_shares
   */

  export type AggregatePending_shares = {
    _count: Pending_sharesCountAggregateOutputType | null
    _min: Pending_sharesMinAggregateOutputType | null
    _max: Pending_sharesMaxAggregateOutputType | null
  }

  export type Pending_sharesMinAggregateOutputType = {
    id: string | null
    note_id: string | null
    user_email: string | null
    permission: $Enums.pending_shares_permission | null
  }

  export type Pending_sharesMaxAggregateOutputType = {
    id: string | null
    note_id: string | null
    user_email: string | null
    permission: $Enums.pending_shares_permission | null
  }

  export type Pending_sharesCountAggregateOutputType = {
    id: number
    note_id: number
    user_email: number
    permission: number
    _all: number
  }


  export type Pending_sharesMinAggregateInputType = {
    id?: true
    note_id?: true
    user_email?: true
    permission?: true
  }

  export type Pending_sharesMaxAggregateInputType = {
    id?: true
    note_id?: true
    user_email?: true
    permission?: true
  }

  export type Pending_sharesCountAggregateInputType = {
    id?: true
    note_id?: true
    user_email?: true
    permission?: true
    _all?: true
  }

  export type Pending_sharesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which pending_shares to aggregate.
     */
    where?: pending_sharesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pending_shares to fetch.
     */
    orderBy?: pending_sharesOrderByWithRelationInput | pending_sharesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: pending_sharesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pending_shares from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pending_shares.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned pending_shares
    **/
    _count?: true | Pending_sharesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: Pending_sharesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: Pending_sharesMaxAggregateInputType
  }

  export type GetPending_sharesAggregateType<T extends Pending_sharesAggregateArgs> = {
        [P in keyof T & keyof AggregatePending_shares]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregatePending_shares[P]>
      : GetScalarType<T[P], AggregatePending_shares[P]>
  }




  export type pending_sharesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: pending_sharesWhereInput
    orderBy?: pending_sharesOrderByWithAggregationInput | pending_sharesOrderByWithAggregationInput[]
    by: Pending_sharesScalarFieldEnum[] | Pending_sharesScalarFieldEnum
    having?: pending_sharesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: Pending_sharesCountAggregateInputType | true
    _min?: Pending_sharesMinAggregateInputType
    _max?: Pending_sharesMaxAggregateInputType
  }

  export type Pending_sharesGroupByOutputType = {
    id: string
    note_id: string
    user_email: string
    permission: $Enums.pending_shares_permission
    _count: Pending_sharesCountAggregateOutputType | null
    _min: Pending_sharesMinAggregateOutputType | null
    _max: Pending_sharesMaxAggregateOutputType | null
  }

  type GetPending_sharesGroupByPayload<T extends pending_sharesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<Pending_sharesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof Pending_sharesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], Pending_sharesGroupByOutputType[P]>
            : GetScalarType<T[P], Pending_sharesGroupByOutputType[P]>
        }
      >
    >


  export type pending_sharesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    note_id?: boolean
    user_email?: boolean
    permission?: boolean
  }, ExtArgs["result"]["pending_shares"]>



  export type pending_sharesSelectScalar = {
    id?: boolean
    note_id?: boolean
    user_email?: boolean
    permission?: boolean
  }

  export type pending_sharesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "note_id" | "user_email" | "permission", ExtArgs["result"]["pending_shares"]>

  export type $pending_sharesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "pending_shares"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      note_id: string
      user_email: string
      permission: $Enums.pending_shares_permission
    }, ExtArgs["result"]["pending_shares"]>
    composites: {}
  }

  type pending_sharesGetPayload<S extends boolean | null | undefined | pending_sharesDefaultArgs> = $Result.GetResult<Prisma.$pending_sharesPayload, S>

  type pending_sharesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<pending_sharesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: Pending_sharesCountAggregateInputType | true
    }

  export interface pending_sharesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['pending_shares'], meta: { name: 'pending_shares' } }
    /**
     * Find zero or one Pending_shares that matches the filter.
     * @param {pending_sharesFindUniqueArgs} args - Arguments to find a Pending_shares
     * @example
     * // Get one Pending_shares
     * const pending_shares = await prisma.pending_shares.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends pending_sharesFindUniqueArgs>(args: SelectSubset<T, pending_sharesFindUniqueArgs<ExtArgs>>): Prisma__pending_sharesClient<$Result.GetResult<Prisma.$pending_sharesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Pending_shares that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {pending_sharesFindUniqueOrThrowArgs} args - Arguments to find a Pending_shares
     * @example
     * // Get one Pending_shares
     * const pending_shares = await prisma.pending_shares.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends pending_sharesFindUniqueOrThrowArgs>(args: SelectSubset<T, pending_sharesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__pending_sharesClient<$Result.GetResult<Prisma.$pending_sharesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pending_shares that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pending_sharesFindFirstArgs} args - Arguments to find a Pending_shares
     * @example
     * // Get one Pending_shares
     * const pending_shares = await prisma.pending_shares.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends pending_sharesFindFirstArgs>(args?: SelectSubset<T, pending_sharesFindFirstArgs<ExtArgs>>): Prisma__pending_sharesClient<$Result.GetResult<Prisma.$pending_sharesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Pending_shares that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pending_sharesFindFirstOrThrowArgs} args - Arguments to find a Pending_shares
     * @example
     * // Get one Pending_shares
     * const pending_shares = await prisma.pending_shares.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends pending_sharesFindFirstOrThrowArgs>(args?: SelectSubset<T, pending_sharesFindFirstOrThrowArgs<ExtArgs>>): Prisma__pending_sharesClient<$Result.GetResult<Prisma.$pending_sharesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Pending_shares that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pending_sharesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Pending_shares
     * const pending_shares = await prisma.pending_shares.findMany()
     * 
     * // Get first 10 Pending_shares
     * const pending_shares = await prisma.pending_shares.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const pending_sharesWithIdOnly = await prisma.pending_shares.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends pending_sharesFindManyArgs>(args?: SelectSubset<T, pending_sharesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$pending_sharesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Pending_shares.
     * @param {pending_sharesCreateArgs} args - Arguments to create a Pending_shares.
     * @example
     * // Create one Pending_shares
     * const Pending_shares = await prisma.pending_shares.create({
     *   data: {
     *     // ... data to create a Pending_shares
     *   }
     * })
     * 
     */
    create<T extends pending_sharesCreateArgs>(args: SelectSubset<T, pending_sharesCreateArgs<ExtArgs>>): Prisma__pending_sharesClient<$Result.GetResult<Prisma.$pending_sharesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Pending_shares.
     * @param {pending_sharesCreateManyArgs} args - Arguments to create many Pending_shares.
     * @example
     * // Create many Pending_shares
     * const pending_shares = await prisma.pending_shares.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends pending_sharesCreateManyArgs>(args?: SelectSubset<T, pending_sharesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Pending_shares.
     * @param {pending_sharesDeleteArgs} args - Arguments to delete one Pending_shares.
     * @example
     * // Delete one Pending_shares
     * const Pending_shares = await prisma.pending_shares.delete({
     *   where: {
     *     // ... filter to delete one Pending_shares
     *   }
     * })
     * 
     */
    delete<T extends pending_sharesDeleteArgs>(args: SelectSubset<T, pending_sharesDeleteArgs<ExtArgs>>): Prisma__pending_sharesClient<$Result.GetResult<Prisma.$pending_sharesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Pending_shares.
     * @param {pending_sharesUpdateArgs} args - Arguments to update one Pending_shares.
     * @example
     * // Update one Pending_shares
     * const pending_shares = await prisma.pending_shares.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends pending_sharesUpdateArgs>(args: SelectSubset<T, pending_sharesUpdateArgs<ExtArgs>>): Prisma__pending_sharesClient<$Result.GetResult<Prisma.$pending_sharesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Pending_shares.
     * @param {pending_sharesDeleteManyArgs} args - Arguments to filter Pending_shares to delete.
     * @example
     * // Delete a few Pending_shares
     * const { count } = await prisma.pending_shares.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends pending_sharesDeleteManyArgs>(args?: SelectSubset<T, pending_sharesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Pending_shares.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pending_sharesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Pending_shares
     * const pending_shares = await prisma.pending_shares.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends pending_sharesUpdateManyArgs>(args: SelectSubset<T, pending_sharesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Pending_shares.
     * @param {pending_sharesUpsertArgs} args - Arguments to update or create a Pending_shares.
     * @example
     * // Update or create a Pending_shares
     * const pending_shares = await prisma.pending_shares.upsert({
     *   create: {
     *     // ... data to create a Pending_shares
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Pending_shares we want to update
     *   }
     * })
     */
    upsert<T extends pending_sharesUpsertArgs>(args: SelectSubset<T, pending_sharesUpsertArgs<ExtArgs>>): Prisma__pending_sharesClient<$Result.GetResult<Prisma.$pending_sharesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Pending_shares.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pending_sharesCountArgs} args - Arguments to filter Pending_shares to count.
     * @example
     * // Count the number of Pending_shares
     * const count = await prisma.pending_shares.count({
     *   where: {
     *     // ... the filter for the Pending_shares we want to count
     *   }
     * })
    **/
    count<T extends pending_sharesCountArgs>(
      args?: Subset<T, pending_sharesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], Pending_sharesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Pending_shares.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {Pending_sharesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends Pending_sharesAggregateArgs>(args: Subset<T, Pending_sharesAggregateArgs>): Prisma.PrismaPromise<GetPending_sharesAggregateType<T>>

    /**
     * Group by Pending_shares.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {pending_sharesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends pending_sharesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: pending_sharesGroupByArgs['orderBy'] }
        : { orderBy?: pending_sharesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, pending_sharesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetPending_sharesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the pending_shares model
   */
  readonly fields: pending_sharesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for pending_shares.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__pending_sharesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the pending_shares model
   */
  interface pending_sharesFieldRefs {
    readonly id: FieldRef<"pending_shares", 'String'>
    readonly note_id: FieldRef<"pending_shares", 'String'>
    readonly user_email: FieldRef<"pending_shares", 'String'>
    readonly permission: FieldRef<"pending_shares", 'pending_shares_permission'>
  }
    

  // Custom InputTypes
  /**
   * pending_shares findUnique
   */
  export type pending_sharesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pending_shares
     */
    select?: pending_sharesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pending_shares
     */
    omit?: pending_sharesOmit<ExtArgs> | null
    /**
     * Filter, which pending_shares to fetch.
     */
    where: pending_sharesWhereUniqueInput
  }

  /**
   * pending_shares findUniqueOrThrow
   */
  export type pending_sharesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pending_shares
     */
    select?: pending_sharesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pending_shares
     */
    omit?: pending_sharesOmit<ExtArgs> | null
    /**
     * Filter, which pending_shares to fetch.
     */
    where: pending_sharesWhereUniqueInput
  }

  /**
   * pending_shares findFirst
   */
  export type pending_sharesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pending_shares
     */
    select?: pending_sharesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pending_shares
     */
    omit?: pending_sharesOmit<ExtArgs> | null
    /**
     * Filter, which pending_shares to fetch.
     */
    where?: pending_sharesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pending_shares to fetch.
     */
    orderBy?: pending_sharesOrderByWithRelationInput | pending_sharesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for pending_shares.
     */
    cursor?: pending_sharesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pending_shares from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pending_shares.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of pending_shares.
     */
    distinct?: Pending_sharesScalarFieldEnum | Pending_sharesScalarFieldEnum[]
  }

  /**
   * pending_shares findFirstOrThrow
   */
  export type pending_sharesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pending_shares
     */
    select?: pending_sharesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pending_shares
     */
    omit?: pending_sharesOmit<ExtArgs> | null
    /**
     * Filter, which pending_shares to fetch.
     */
    where?: pending_sharesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pending_shares to fetch.
     */
    orderBy?: pending_sharesOrderByWithRelationInput | pending_sharesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for pending_shares.
     */
    cursor?: pending_sharesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pending_shares from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pending_shares.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of pending_shares.
     */
    distinct?: Pending_sharesScalarFieldEnum | Pending_sharesScalarFieldEnum[]
  }

  /**
   * pending_shares findMany
   */
  export type pending_sharesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pending_shares
     */
    select?: pending_sharesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pending_shares
     */
    omit?: pending_sharesOmit<ExtArgs> | null
    /**
     * Filter, which pending_shares to fetch.
     */
    where?: pending_sharesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of pending_shares to fetch.
     */
    orderBy?: pending_sharesOrderByWithRelationInput | pending_sharesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing pending_shares.
     */
    cursor?: pending_sharesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` pending_shares from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` pending_shares.
     */
    skip?: number
    distinct?: Pending_sharesScalarFieldEnum | Pending_sharesScalarFieldEnum[]
  }

  /**
   * pending_shares create
   */
  export type pending_sharesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pending_shares
     */
    select?: pending_sharesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pending_shares
     */
    omit?: pending_sharesOmit<ExtArgs> | null
    /**
     * The data needed to create a pending_shares.
     */
    data: XOR<pending_sharesCreateInput, pending_sharesUncheckedCreateInput>
  }

  /**
   * pending_shares createMany
   */
  export type pending_sharesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many pending_shares.
     */
    data: pending_sharesCreateManyInput | pending_sharesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * pending_shares update
   */
  export type pending_sharesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pending_shares
     */
    select?: pending_sharesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pending_shares
     */
    omit?: pending_sharesOmit<ExtArgs> | null
    /**
     * The data needed to update a pending_shares.
     */
    data: XOR<pending_sharesUpdateInput, pending_sharesUncheckedUpdateInput>
    /**
     * Choose, which pending_shares to update.
     */
    where: pending_sharesWhereUniqueInput
  }

  /**
   * pending_shares updateMany
   */
  export type pending_sharesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update pending_shares.
     */
    data: XOR<pending_sharesUpdateManyMutationInput, pending_sharesUncheckedUpdateManyInput>
    /**
     * Filter which pending_shares to update
     */
    where?: pending_sharesWhereInput
    /**
     * Limit how many pending_shares to update.
     */
    limit?: number
  }

  /**
   * pending_shares upsert
   */
  export type pending_sharesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pending_shares
     */
    select?: pending_sharesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pending_shares
     */
    omit?: pending_sharesOmit<ExtArgs> | null
    /**
     * The filter to search for the pending_shares to update in case it exists.
     */
    where: pending_sharesWhereUniqueInput
    /**
     * In case the pending_shares found by the `where` argument doesn't exist, create a new pending_shares with this data.
     */
    create: XOR<pending_sharesCreateInput, pending_sharesUncheckedCreateInput>
    /**
     * In case the pending_shares was found with the provided `where` argument, update it with this data.
     */
    update: XOR<pending_sharesUpdateInput, pending_sharesUncheckedUpdateInput>
  }

  /**
   * pending_shares delete
   */
  export type pending_sharesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pending_shares
     */
    select?: pending_sharesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pending_shares
     */
    omit?: pending_sharesOmit<ExtArgs> | null
    /**
     * Filter which pending_shares to delete.
     */
    where: pending_sharesWhereUniqueInput
  }

  /**
   * pending_shares deleteMany
   */
  export type pending_sharesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which pending_shares to delete
     */
    where?: pending_sharesWhereInput
    /**
     * Limit how many pending_shares to delete.
     */
    limit?: number
  }

  /**
   * pending_shares without action
   */
  export type pending_sharesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the pending_shares
     */
    select?: pending_sharesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the pending_shares
     */
    omit?: pending_sharesOmit<ExtArgs> | null
  }


  /**
   * Model session
   */

  export type AggregateSession = {
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  export type SessionMinAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
  }

  export type SessionMaxAggregateOutputType = {
    id: string | null
    expiresAt: Date | null
    token: string | null
    createdAt: Date | null
    updatedAt: Date | null
    ipAddress: string | null
    userAgent: string | null
    userId: string | null
  }

  export type SessionCountAggregateOutputType = {
    id: number
    expiresAt: number
    token: number
    createdAt: number
    updatedAt: number
    ipAddress: number
    userAgent: number
    userId: number
    _all: number
  }


  export type SessionMinAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
  }

  export type SessionMaxAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
  }

  export type SessionCountAggregateInputType = {
    id?: true
    expiresAt?: true
    token?: true
    createdAt?: true
    updatedAt?: true
    ipAddress?: true
    userAgent?: true
    userId?: true
    _all?: true
  }

  export type SessionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which session to aggregate.
     */
    where?: sessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sessions to fetch.
     */
    orderBy?: sessionOrderByWithRelationInput | sessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: sessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned sessions
    **/
    _count?: true | SessionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SessionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SessionMaxAggregateInputType
  }

  export type GetSessionAggregateType<T extends SessionAggregateArgs> = {
        [P in keyof T & keyof AggregateSession]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSession[P]>
      : GetScalarType<T[P], AggregateSession[P]>
  }




  export type sessionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sessionWhereInput
    orderBy?: sessionOrderByWithAggregationInput | sessionOrderByWithAggregationInput[]
    by: SessionScalarFieldEnum[] | SessionScalarFieldEnum
    having?: sessionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SessionCountAggregateInputType | true
    _min?: SessionMinAggregateInputType
    _max?: SessionMaxAggregateInputType
  }

  export type SessionGroupByOutputType = {
    id: string
    expiresAt: Date
    token: string
    createdAt: Date
    updatedAt: Date
    ipAddress: string | null
    userAgent: string | null
    userId: string
    _count: SessionCountAggregateOutputType | null
    _min: SessionMinAggregateOutputType | null
    _max: SessionMaxAggregateOutputType | null
  }

  type GetSessionGroupByPayload<T extends sessionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SessionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SessionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SessionGroupByOutputType[P]>
            : GetScalarType<T[P], SessionGroupByOutputType[P]>
        }
      >
    >


  export type sessionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
  }, ExtArgs["result"]["session"]>



  export type sessionSelectScalar = {
    id?: boolean
    expiresAt?: boolean
    token?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    ipAddress?: boolean
    userAgent?: boolean
    userId?: boolean
  }

  export type sessionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "expiresAt" | "token" | "createdAt" | "updatedAt" | "ipAddress" | "userAgent" | "userId", ExtArgs["result"]["session"]>

  export type $sessionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "session"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      expiresAt: Date
      token: string
      createdAt: Date
      updatedAt: Date
      ipAddress: string | null
      userAgent: string | null
      userId: string
    }, ExtArgs["result"]["session"]>
    composites: {}
  }

  type sessionGetPayload<S extends boolean | null | undefined | sessionDefaultArgs> = $Result.GetResult<Prisma.$sessionPayload, S>

  type sessionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<sessionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SessionCountAggregateInputType | true
    }

  export interface sessionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['session'], meta: { name: 'session' } }
    /**
     * Find zero or one Session that matches the filter.
     * @param {sessionFindUniqueArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends sessionFindUniqueArgs>(args: SelectSubset<T, sessionFindUniqueArgs<ExtArgs>>): Prisma__sessionClient<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Session that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {sessionFindUniqueOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends sessionFindUniqueOrThrowArgs>(args: SelectSubset<T, sessionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__sessionClient<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionFindFirstArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends sessionFindFirstArgs>(args?: SelectSubset<T, sessionFindFirstArgs<ExtArgs>>): Prisma__sessionClient<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Session that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionFindFirstOrThrowArgs} args - Arguments to find a Session
     * @example
     * // Get one Session
     * const session = await prisma.session.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends sessionFindFirstOrThrowArgs>(args?: SelectSubset<T, sessionFindFirstOrThrowArgs<ExtArgs>>): Prisma__sessionClient<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Sessions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sessions
     * const sessions = await prisma.session.findMany()
     * 
     * // Get first 10 Sessions
     * const sessions = await prisma.session.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sessionWithIdOnly = await prisma.session.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends sessionFindManyArgs>(args?: SelectSubset<T, sessionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Session.
     * @param {sessionCreateArgs} args - Arguments to create a Session.
     * @example
     * // Create one Session
     * const Session = await prisma.session.create({
     *   data: {
     *     // ... data to create a Session
     *   }
     * })
     * 
     */
    create<T extends sessionCreateArgs>(args: SelectSubset<T, sessionCreateArgs<ExtArgs>>): Prisma__sessionClient<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Sessions.
     * @param {sessionCreateManyArgs} args - Arguments to create many Sessions.
     * @example
     * // Create many Sessions
     * const session = await prisma.session.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends sessionCreateManyArgs>(args?: SelectSubset<T, sessionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Session.
     * @param {sessionDeleteArgs} args - Arguments to delete one Session.
     * @example
     * // Delete one Session
     * const Session = await prisma.session.delete({
     *   where: {
     *     // ... filter to delete one Session
     *   }
     * })
     * 
     */
    delete<T extends sessionDeleteArgs>(args: SelectSubset<T, sessionDeleteArgs<ExtArgs>>): Prisma__sessionClient<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Session.
     * @param {sessionUpdateArgs} args - Arguments to update one Session.
     * @example
     * // Update one Session
     * const session = await prisma.session.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends sessionUpdateArgs>(args: SelectSubset<T, sessionUpdateArgs<ExtArgs>>): Prisma__sessionClient<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Sessions.
     * @param {sessionDeleteManyArgs} args - Arguments to filter Sessions to delete.
     * @example
     * // Delete a few Sessions
     * const { count } = await prisma.session.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends sessionDeleteManyArgs>(args?: SelectSubset<T, sessionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sessions
     * const session = await prisma.session.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends sessionUpdateManyArgs>(args: SelectSubset<T, sessionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Session.
     * @param {sessionUpsertArgs} args - Arguments to update or create a Session.
     * @example
     * // Update or create a Session
     * const session = await prisma.session.upsert({
     *   create: {
     *     // ... data to create a Session
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Session we want to update
     *   }
     * })
     */
    upsert<T extends sessionUpsertArgs>(args: SelectSubset<T, sessionUpsertArgs<ExtArgs>>): Prisma__sessionClient<$Result.GetResult<Prisma.$sessionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Sessions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionCountArgs} args - Arguments to filter Sessions to count.
     * @example
     * // Count the number of Sessions
     * const count = await prisma.session.count({
     *   where: {
     *     // ... the filter for the Sessions we want to count
     *   }
     * })
    **/
    count<T extends sessionCountArgs>(
      args?: Subset<T, sessionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SessionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SessionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SessionAggregateArgs>(args: Subset<T, SessionAggregateArgs>): Prisma.PrismaPromise<GetSessionAggregateType<T>>

    /**
     * Group by Session.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sessionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends sessionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: sessionGroupByArgs['orderBy'] }
        : { orderBy?: sessionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, sessionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSessionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the session model
   */
  readonly fields: sessionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for session.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__sessionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the session model
   */
  interface sessionFieldRefs {
    readonly id: FieldRef<"session", 'String'>
    readonly expiresAt: FieldRef<"session", 'DateTime'>
    readonly token: FieldRef<"session", 'String'>
    readonly createdAt: FieldRef<"session", 'DateTime'>
    readonly updatedAt: FieldRef<"session", 'DateTime'>
    readonly ipAddress: FieldRef<"session", 'String'>
    readonly userAgent: FieldRef<"session", 'String'>
    readonly userId: FieldRef<"session", 'String'>
  }
    

  // Custom InputTypes
  /**
   * session findUnique
   */
  export type sessionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * Filter, which session to fetch.
     */
    where: sessionWhereUniqueInput
  }

  /**
   * session findUniqueOrThrow
   */
  export type sessionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * Filter, which session to fetch.
     */
    where: sessionWhereUniqueInput
  }

  /**
   * session findFirst
   */
  export type sessionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * Filter, which session to fetch.
     */
    where?: sessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sessions to fetch.
     */
    orderBy?: sessionOrderByWithRelationInput | sessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sessions.
     */
    cursor?: sessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * session findFirstOrThrow
   */
  export type sessionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * Filter, which session to fetch.
     */
    where?: sessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sessions to fetch.
     */
    orderBy?: sessionOrderByWithRelationInput | sessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for sessions.
     */
    cursor?: sessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sessions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of sessions.
     */
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * session findMany
   */
  export type sessionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * Filter, which sessions to fetch.
     */
    where?: sessionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of sessions to fetch.
     */
    orderBy?: sessionOrderByWithRelationInput | sessionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing sessions.
     */
    cursor?: sessionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` sessions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` sessions.
     */
    skip?: number
    distinct?: SessionScalarFieldEnum | SessionScalarFieldEnum[]
  }

  /**
   * session create
   */
  export type sessionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * The data needed to create a session.
     */
    data: XOR<sessionCreateInput, sessionUncheckedCreateInput>
  }

  /**
   * session createMany
   */
  export type sessionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many sessions.
     */
    data: sessionCreateManyInput | sessionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * session update
   */
  export type sessionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * The data needed to update a session.
     */
    data: XOR<sessionUpdateInput, sessionUncheckedUpdateInput>
    /**
     * Choose, which session to update.
     */
    where: sessionWhereUniqueInput
  }

  /**
   * session updateMany
   */
  export type sessionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update sessions.
     */
    data: XOR<sessionUpdateManyMutationInput, sessionUncheckedUpdateManyInput>
    /**
     * Filter which sessions to update
     */
    where?: sessionWhereInput
    /**
     * Limit how many sessions to update.
     */
    limit?: number
  }

  /**
   * session upsert
   */
  export type sessionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * The filter to search for the session to update in case it exists.
     */
    where: sessionWhereUniqueInput
    /**
     * In case the session found by the `where` argument doesn't exist, create a new session with this data.
     */
    create: XOR<sessionCreateInput, sessionUncheckedCreateInput>
    /**
     * In case the session was found with the provided `where` argument, update it with this data.
     */
    update: XOR<sessionUpdateInput, sessionUncheckedUpdateInput>
  }

  /**
   * session delete
   */
  export type sessionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
    /**
     * Filter which session to delete.
     */
    where: sessionWhereUniqueInput
  }

  /**
   * session deleteMany
   */
  export type sessionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which sessions to delete
     */
    where?: sessionWhereInput
    /**
     * Limit how many sessions to delete.
     */
    limit?: number
  }

  /**
   * session without action
   */
  export type sessionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the session
     */
    select?: sessionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the session
     */
    omit?: sessionOmit<ExtArgs> | null
  }


  /**
   * Model shares
   */

  export type AggregateShares = {
    _count: SharesCountAggregateOutputType | null
    _min: SharesMinAggregateOutputType | null
    _max: SharesMaxAggregateOutputType | null
  }

  export type SharesMinAggregateOutputType = {
    id: string | null
    note_id: string | null
    user_id: string | null
    created_at: Date | null
    expires_at: Date | null
    permission: $Enums.shares_permission | null
  }

  export type SharesMaxAggregateOutputType = {
    id: string | null
    note_id: string | null
    user_id: string | null
    created_at: Date | null
    expires_at: Date | null
    permission: $Enums.shares_permission | null
  }

  export type SharesCountAggregateOutputType = {
    id: number
    note_id: number
    user_id: number
    created_at: number
    expires_at: number
    permission: number
    _all: number
  }


  export type SharesMinAggregateInputType = {
    id?: true
    note_id?: true
    user_id?: true
    created_at?: true
    expires_at?: true
    permission?: true
  }

  export type SharesMaxAggregateInputType = {
    id?: true
    note_id?: true
    user_id?: true
    created_at?: true
    expires_at?: true
    permission?: true
  }

  export type SharesCountAggregateInputType = {
    id?: true
    note_id?: true
    user_id?: true
    created_at?: true
    expires_at?: true
    permission?: true
    _all?: true
  }

  export type SharesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which shares to aggregate.
     */
    where?: sharesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of shares to fetch.
     */
    orderBy?: sharesOrderByWithRelationInput | sharesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: sharesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` shares from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` shares.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned shares
    **/
    _count?: true | SharesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SharesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SharesMaxAggregateInputType
  }

  export type GetSharesAggregateType<T extends SharesAggregateArgs> = {
        [P in keyof T & keyof AggregateShares]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateShares[P]>
      : GetScalarType<T[P], AggregateShares[P]>
  }




  export type sharesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: sharesWhereInput
    orderBy?: sharesOrderByWithAggregationInput | sharesOrderByWithAggregationInput[]
    by: SharesScalarFieldEnum[] | SharesScalarFieldEnum
    having?: sharesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SharesCountAggregateInputType | true
    _min?: SharesMinAggregateInputType
    _max?: SharesMaxAggregateInputType
  }

  export type SharesGroupByOutputType = {
    id: string
    note_id: string
    user_id: string
    created_at: Date | null
    expires_at: Date | null
    permission: $Enums.shares_permission | null
    _count: SharesCountAggregateOutputType | null
    _min: SharesMinAggregateOutputType | null
    _max: SharesMaxAggregateOutputType | null
  }

  type GetSharesGroupByPayload<T extends sharesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SharesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SharesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SharesGroupByOutputType[P]>
            : GetScalarType<T[P], SharesGroupByOutputType[P]>
        }
      >
    >


  export type sharesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    note_id?: boolean
    user_id?: boolean
    created_at?: boolean
    expires_at?: boolean
    permission?: boolean
    notes?: boolean | notesDefaultArgs<ExtArgs>
    user?: boolean | userDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["shares"]>



  export type sharesSelectScalar = {
    id?: boolean
    note_id?: boolean
    user_id?: boolean
    created_at?: boolean
    expires_at?: boolean
    permission?: boolean
  }

  export type sharesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "note_id" | "user_id" | "created_at" | "expires_at" | "permission", ExtArgs["result"]["shares"]>
  export type sharesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    notes?: boolean | notesDefaultArgs<ExtArgs>
    user?: boolean | userDefaultArgs<ExtArgs>
  }

  export type $sharesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "shares"
    objects: {
      notes: Prisma.$notesPayload<ExtArgs>
      user: Prisma.$userPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      note_id: string
      user_id: string
      created_at: Date | null
      expires_at: Date | null
      permission: $Enums.shares_permission | null
    }, ExtArgs["result"]["shares"]>
    composites: {}
  }

  type sharesGetPayload<S extends boolean | null | undefined | sharesDefaultArgs> = $Result.GetResult<Prisma.$sharesPayload, S>

  type sharesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<sharesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SharesCountAggregateInputType | true
    }

  export interface sharesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['shares'], meta: { name: 'shares' } }
    /**
     * Find zero or one Shares that matches the filter.
     * @param {sharesFindUniqueArgs} args - Arguments to find a Shares
     * @example
     * // Get one Shares
     * const shares = await prisma.shares.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends sharesFindUniqueArgs>(args: SelectSubset<T, sharesFindUniqueArgs<ExtArgs>>): Prisma__sharesClient<$Result.GetResult<Prisma.$sharesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Shares that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {sharesFindUniqueOrThrowArgs} args - Arguments to find a Shares
     * @example
     * // Get one Shares
     * const shares = await prisma.shares.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends sharesFindUniqueOrThrowArgs>(args: SelectSubset<T, sharesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__sharesClient<$Result.GetResult<Prisma.$sharesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Shares that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sharesFindFirstArgs} args - Arguments to find a Shares
     * @example
     * // Get one Shares
     * const shares = await prisma.shares.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends sharesFindFirstArgs>(args?: SelectSubset<T, sharesFindFirstArgs<ExtArgs>>): Prisma__sharesClient<$Result.GetResult<Prisma.$sharesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Shares that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sharesFindFirstOrThrowArgs} args - Arguments to find a Shares
     * @example
     * // Get one Shares
     * const shares = await prisma.shares.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends sharesFindFirstOrThrowArgs>(args?: SelectSubset<T, sharesFindFirstOrThrowArgs<ExtArgs>>): Prisma__sharesClient<$Result.GetResult<Prisma.$sharesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Shares that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sharesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Shares
     * const shares = await prisma.shares.findMany()
     * 
     * // Get first 10 Shares
     * const shares = await prisma.shares.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const sharesWithIdOnly = await prisma.shares.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends sharesFindManyArgs>(args?: SelectSubset<T, sharesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sharesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Shares.
     * @param {sharesCreateArgs} args - Arguments to create a Shares.
     * @example
     * // Create one Shares
     * const Shares = await prisma.shares.create({
     *   data: {
     *     // ... data to create a Shares
     *   }
     * })
     * 
     */
    create<T extends sharesCreateArgs>(args: SelectSubset<T, sharesCreateArgs<ExtArgs>>): Prisma__sharesClient<$Result.GetResult<Prisma.$sharesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Shares.
     * @param {sharesCreateManyArgs} args - Arguments to create many Shares.
     * @example
     * // Create many Shares
     * const shares = await prisma.shares.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends sharesCreateManyArgs>(args?: SelectSubset<T, sharesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Shares.
     * @param {sharesDeleteArgs} args - Arguments to delete one Shares.
     * @example
     * // Delete one Shares
     * const Shares = await prisma.shares.delete({
     *   where: {
     *     // ... filter to delete one Shares
     *   }
     * })
     * 
     */
    delete<T extends sharesDeleteArgs>(args: SelectSubset<T, sharesDeleteArgs<ExtArgs>>): Prisma__sharesClient<$Result.GetResult<Prisma.$sharesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Shares.
     * @param {sharesUpdateArgs} args - Arguments to update one Shares.
     * @example
     * // Update one Shares
     * const shares = await prisma.shares.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends sharesUpdateArgs>(args: SelectSubset<T, sharesUpdateArgs<ExtArgs>>): Prisma__sharesClient<$Result.GetResult<Prisma.$sharesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Shares.
     * @param {sharesDeleteManyArgs} args - Arguments to filter Shares to delete.
     * @example
     * // Delete a few Shares
     * const { count } = await prisma.shares.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends sharesDeleteManyArgs>(args?: SelectSubset<T, sharesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Shares.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sharesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Shares
     * const shares = await prisma.shares.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends sharesUpdateManyArgs>(args: SelectSubset<T, sharesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Shares.
     * @param {sharesUpsertArgs} args - Arguments to update or create a Shares.
     * @example
     * // Update or create a Shares
     * const shares = await prisma.shares.upsert({
     *   create: {
     *     // ... data to create a Shares
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Shares we want to update
     *   }
     * })
     */
    upsert<T extends sharesUpsertArgs>(args: SelectSubset<T, sharesUpsertArgs<ExtArgs>>): Prisma__sharesClient<$Result.GetResult<Prisma.$sharesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Shares.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sharesCountArgs} args - Arguments to filter Shares to count.
     * @example
     * // Count the number of Shares
     * const count = await prisma.shares.count({
     *   where: {
     *     // ... the filter for the Shares we want to count
     *   }
     * })
    **/
    count<T extends sharesCountArgs>(
      args?: Subset<T, sharesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SharesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Shares.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SharesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SharesAggregateArgs>(args: Subset<T, SharesAggregateArgs>): Prisma.PrismaPromise<GetSharesAggregateType<T>>

    /**
     * Group by Shares.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sharesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends sharesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: sharesGroupByArgs['orderBy'] }
        : { orderBy?: sharesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, sharesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSharesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the shares model
   */
  readonly fields: sharesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for shares.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__sharesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    notes<T extends notesDefaultArgs<ExtArgs> = {}>(args?: Subset<T, notesDefaultArgs<ExtArgs>>): Prisma__notesClient<$Result.GetResult<Prisma.$notesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the shares model
   */
  interface sharesFieldRefs {
    readonly id: FieldRef<"shares", 'String'>
    readonly note_id: FieldRef<"shares", 'String'>
    readonly user_id: FieldRef<"shares", 'String'>
    readonly created_at: FieldRef<"shares", 'DateTime'>
    readonly expires_at: FieldRef<"shares", 'DateTime'>
    readonly permission: FieldRef<"shares", 'shares_permission'>
  }
    

  // Custom InputTypes
  /**
   * shares findUnique
   */
  export type sharesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shares
     */
    select?: sharesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the shares
     */
    omit?: sharesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sharesInclude<ExtArgs> | null
    /**
     * Filter, which shares to fetch.
     */
    where: sharesWhereUniqueInput
  }

  /**
   * shares findUniqueOrThrow
   */
  export type sharesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shares
     */
    select?: sharesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the shares
     */
    omit?: sharesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sharesInclude<ExtArgs> | null
    /**
     * Filter, which shares to fetch.
     */
    where: sharesWhereUniqueInput
  }

  /**
   * shares findFirst
   */
  export type sharesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shares
     */
    select?: sharesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the shares
     */
    omit?: sharesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sharesInclude<ExtArgs> | null
    /**
     * Filter, which shares to fetch.
     */
    where?: sharesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of shares to fetch.
     */
    orderBy?: sharesOrderByWithRelationInput | sharesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for shares.
     */
    cursor?: sharesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` shares from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` shares.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of shares.
     */
    distinct?: SharesScalarFieldEnum | SharesScalarFieldEnum[]
  }

  /**
   * shares findFirstOrThrow
   */
  export type sharesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shares
     */
    select?: sharesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the shares
     */
    omit?: sharesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sharesInclude<ExtArgs> | null
    /**
     * Filter, which shares to fetch.
     */
    where?: sharesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of shares to fetch.
     */
    orderBy?: sharesOrderByWithRelationInput | sharesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for shares.
     */
    cursor?: sharesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` shares from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` shares.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of shares.
     */
    distinct?: SharesScalarFieldEnum | SharesScalarFieldEnum[]
  }

  /**
   * shares findMany
   */
  export type sharesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shares
     */
    select?: sharesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the shares
     */
    omit?: sharesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sharesInclude<ExtArgs> | null
    /**
     * Filter, which shares to fetch.
     */
    where?: sharesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of shares to fetch.
     */
    orderBy?: sharesOrderByWithRelationInput | sharesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing shares.
     */
    cursor?: sharesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` shares from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` shares.
     */
    skip?: number
    distinct?: SharesScalarFieldEnum | SharesScalarFieldEnum[]
  }

  /**
   * shares create
   */
  export type sharesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shares
     */
    select?: sharesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the shares
     */
    omit?: sharesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sharesInclude<ExtArgs> | null
    /**
     * The data needed to create a shares.
     */
    data: XOR<sharesCreateInput, sharesUncheckedCreateInput>
  }

  /**
   * shares createMany
   */
  export type sharesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many shares.
     */
    data: sharesCreateManyInput | sharesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * shares update
   */
  export type sharesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shares
     */
    select?: sharesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the shares
     */
    omit?: sharesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sharesInclude<ExtArgs> | null
    /**
     * The data needed to update a shares.
     */
    data: XOR<sharesUpdateInput, sharesUncheckedUpdateInput>
    /**
     * Choose, which shares to update.
     */
    where: sharesWhereUniqueInput
  }

  /**
   * shares updateMany
   */
  export type sharesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update shares.
     */
    data: XOR<sharesUpdateManyMutationInput, sharesUncheckedUpdateManyInput>
    /**
     * Filter which shares to update
     */
    where?: sharesWhereInput
    /**
     * Limit how many shares to update.
     */
    limit?: number
  }

  /**
   * shares upsert
   */
  export type sharesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shares
     */
    select?: sharesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the shares
     */
    omit?: sharesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sharesInclude<ExtArgs> | null
    /**
     * The filter to search for the shares to update in case it exists.
     */
    where: sharesWhereUniqueInput
    /**
     * In case the shares found by the `where` argument doesn't exist, create a new shares with this data.
     */
    create: XOR<sharesCreateInput, sharesUncheckedCreateInput>
    /**
     * In case the shares was found with the provided `where` argument, update it with this data.
     */
    update: XOR<sharesUpdateInput, sharesUncheckedUpdateInput>
  }

  /**
   * shares delete
   */
  export type sharesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shares
     */
    select?: sharesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the shares
     */
    omit?: sharesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sharesInclude<ExtArgs> | null
    /**
     * Filter which shares to delete.
     */
    where: sharesWhereUniqueInput
  }

  /**
   * shares deleteMany
   */
  export type sharesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which shares to delete
     */
    where?: sharesWhereInput
    /**
     * Limit how many shares to delete.
     */
    limit?: number
  }

  /**
   * shares without action
   */
  export type sharesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shares
     */
    select?: sharesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the shares
     */
    omit?: sharesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sharesInclude<ExtArgs> | null
  }


  /**
   * Model tags
   */

  export type AggregateTags = {
    _count: TagsCountAggregateOutputType | null
    _min: TagsMinAggregateOutputType | null
    _max: TagsMaxAggregateOutputType | null
  }

  export type TagsMinAggregateOutputType = {
    id: string | null
    name: string | null
    user_id: string | null
    created_at: Date | null
  }

  export type TagsMaxAggregateOutputType = {
    id: string | null
    name: string | null
    user_id: string | null
    created_at: Date | null
  }

  export type TagsCountAggregateOutputType = {
    id: number
    name: number
    user_id: number
    created_at: number
    _all: number
  }


  export type TagsMinAggregateInputType = {
    id?: true
    name?: true
    user_id?: true
    created_at?: true
  }

  export type TagsMaxAggregateInputType = {
    id?: true
    name?: true
    user_id?: true
    created_at?: true
  }

  export type TagsCountAggregateInputType = {
    id?: true
    name?: true
    user_id?: true
    created_at?: true
    _all?: true
  }

  export type TagsAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tags to aggregate.
     */
    where?: tagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tags to fetch.
     */
    orderBy?: tagsOrderByWithRelationInput | tagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: tagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned tags
    **/
    _count?: true | TagsCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: TagsMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: TagsMaxAggregateInputType
  }

  export type GetTagsAggregateType<T extends TagsAggregateArgs> = {
        [P in keyof T & keyof AggregateTags]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateTags[P]>
      : GetScalarType<T[P], AggregateTags[P]>
  }




  export type tagsGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: tagsWhereInput
    orderBy?: tagsOrderByWithAggregationInput | tagsOrderByWithAggregationInput[]
    by: TagsScalarFieldEnum[] | TagsScalarFieldEnum
    having?: tagsScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: TagsCountAggregateInputType | true
    _min?: TagsMinAggregateInputType
    _max?: TagsMaxAggregateInputType
  }

  export type TagsGroupByOutputType = {
    id: string
    name: string
    user_id: string
    created_at: Date | null
    _count: TagsCountAggregateOutputType | null
    _min: TagsMinAggregateOutputType | null
    _max: TagsMaxAggregateOutputType | null
  }

  type GetTagsGroupByPayload<T extends tagsGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<TagsGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof TagsGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], TagsGroupByOutputType[P]>
            : GetScalarType<T[P], TagsGroupByOutputType[P]>
        }
      >
    >


  export type tagsSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    user_id?: boolean
    created_at?: boolean
    note_tags?: boolean | tags$note_tagsArgs<ExtArgs>
    user?: boolean | userDefaultArgs<ExtArgs>
    _count?: boolean | TagsCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["tags"]>



  export type tagsSelectScalar = {
    id?: boolean
    name?: boolean
    user_id?: boolean
    created_at?: boolean
  }

  export type tagsOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "user_id" | "created_at", ExtArgs["result"]["tags"]>
  export type tagsInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    note_tags?: boolean | tags$note_tagsArgs<ExtArgs>
    user?: boolean | userDefaultArgs<ExtArgs>
    _count?: boolean | TagsCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $tagsPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "tags"
    objects: {
      note_tags: Prisma.$note_tagsPayload<ExtArgs>[]
      user: Prisma.$userPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      user_id: string
      created_at: Date | null
    }, ExtArgs["result"]["tags"]>
    composites: {}
  }

  type tagsGetPayload<S extends boolean | null | undefined | tagsDefaultArgs> = $Result.GetResult<Prisma.$tagsPayload, S>

  type tagsCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<tagsFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: TagsCountAggregateInputType | true
    }

  export interface tagsDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['tags'], meta: { name: 'tags' } }
    /**
     * Find zero or one Tags that matches the filter.
     * @param {tagsFindUniqueArgs} args - Arguments to find a Tags
     * @example
     * // Get one Tags
     * const tags = await prisma.tags.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends tagsFindUniqueArgs>(args: SelectSubset<T, tagsFindUniqueArgs<ExtArgs>>): Prisma__tagsClient<$Result.GetResult<Prisma.$tagsPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Tags that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {tagsFindUniqueOrThrowArgs} args - Arguments to find a Tags
     * @example
     * // Get one Tags
     * const tags = await prisma.tags.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends tagsFindUniqueOrThrowArgs>(args: SelectSubset<T, tagsFindUniqueOrThrowArgs<ExtArgs>>): Prisma__tagsClient<$Result.GetResult<Prisma.$tagsPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tagsFindFirstArgs} args - Arguments to find a Tags
     * @example
     * // Get one Tags
     * const tags = await prisma.tags.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends tagsFindFirstArgs>(args?: SelectSubset<T, tagsFindFirstArgs<ExtArgs>>): Prisma__tagsClient<$Result.GetResult<Prisma.$tagsPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Tags that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tagsFindFirstOrThrowArgs} args - Arguments to find a Tags
     * @example
     * // Get one Tags
     * const tags = await prisma.tags.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends tagsFindFirstOrThrowArgs>(args?: SelectSubset<T, tagsFindFirstOrThrowArgs<ExtArgs>>): Prisma__tagsClient<$Result.GetResult<Prisma.$tagsPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Tags that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tagsFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Tags
     * const tags = await prisma.tags.findMany()
     * 
     * // Get first 10 Tags
     * const tags = await prisma.tags.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const tagsWithIdOnly = await prisma.tags.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends tagsFindManyArgs>(args?: SelectSubset<T, tagsFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tagsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Tags.
     * @param {tagsCreateArgs} args - Arguments to create a Tags.
     * @example
     * // Create one Tags
     * const Tags = await prisma.tags.create({
     *   data: {
     *     // ... data to create a Tags
     *   }
     * })
     * 
     */
    create<T extends tagsCreateArgs>(args: SelectSubset<T, tagsCreateArgs<ExtArgs>>): Prisma__tagsClient<$Result.GetResult<Prisma.$tagsPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Tags.
     * @param {tagsCreateManyArgs} args - Arguments to create many Tags.
     * @example
     * // Create many Tags
     * const tags = await prisma.tags.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends tagsCreateManyArgs>(args?: SelectSubset<T, tagsCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Tags.
     * @param {tagsDeleteArgs} args - Arguments to delete one Tags.
     * @example
     * // Delete one Tags
     * const Tags = await prisma.tags.delete({
     *   where: {
     *     // ... filter to delete one Tags
     *   }
     * })
     * 
     */
    delete<T extends tagsDeleteArgs>(args: SelectSubset<T, tagsDeleteArgs<ExtArgs>>): Prisma__tagsClient<$Result.GetResult<Prisma.$tagsPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Tags.
     * @param {tagsUpdateArgs} args - Arguments to update one Tags.
     * @example
     * // Update one Tags
     * const tags = await prisma.tags.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends tagsUpdateArgs>(args: SelectSubset<T, tagsUpdateArgs<ExtArgs>>): Prisma__tagsClient<$Result.GetResult<Prisma.$tagsPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Tags.
     * @param {tagsDeleteManyArgs} args - Arguments to filter Tags to delete.
     * @example
     * // Delete a few Tags
     * const { count } = await prisma.tags.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends tagsDeleteManyArgs>(args?: SelectSubset<T, tagsDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tagsUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Tags
     * const tags = await prisma.tags.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends tagsUpdateManyArgs>(args: SelectSubset<T, tagsUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Tags.
     * @param {tagsUpsertArgs} args - Arguments to update or create a Tags.
     * @example
     * // Update or create a Tags
     * const tags = await prisma.tags.upsert({
     *   create: {
     *     // ... data to create a Tags
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Tags we want to update
     *   }
     * })
     */
    upsert<T extends tagsUpsertArgs>(args: SelectSubset<T, tagsUpsertArgs<ExtArgs>>): Prisma__tagsClient<$Result.GetResult<Prisma.$tagsPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tagsCountArgs} args - Arguments to filter Tags to count.
     * @example
     * // Count the number of Tags
     * const count = await prisma.tags.count({
     *   where: {
     *     // ... the filter for the Tags we want to count
     *   }
     * })
    **/
    count<T extends tagsCountArgs>(
      args?: Subset<T, tagsCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], TagsCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {TagsAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends TagsAggregateArgs>(args: Subset<T, TagsAggregateArgs>): Prisma.PrismaPromise<GetTagsAggregateType<T>>

    /**
     * Group by Tags.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {tagsGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends tagsGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: tagsGroupByArgs['orderBy'] }
        : { orderBy?: tagsGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, tagsGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetTagsGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the tags model
   */
  readonly fields: tagsFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for tags.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__tagsClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    note_tags<T extends tags$note_tagsArgs<ExtArgs> = {}>(args?: Subset<T, tags$note_tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$note_tagsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    user<T extends userDefaultArgs<ExtArgs> = {}>(args?: Subset<T, userDefaultArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the tags model
   */
  interface tagsFieldRefs {
    readonly id: FieldRef<"tags", 'String'>
    readonly name: FieldRef<"tags", 'String'>
    readonly user_id: FieldRef<"tags", 'String'>
    readonly created_at: FieldRef<"tags", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * tags findUnique
   */
  export type tagsFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tags
     */
    select?: tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tags
     */
    omit?: tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagsInclude<ExtArgs> | null
    /**
     * Filter, which tags to fetch.
     */
    where: tagsWhereUniqueInput
  }

  /**
   * tags findUniqueOrThrow
   */
  export type tagsFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tags
     */
    select?: tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tags
     */
    omit?: tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagsInclude<ExtArgs> | null
    /**
     * Filter, which tags to fetch.
     */
    where: tagsWhereUniqueInput
  }

  /**
   * tags findFirst
   */
  export type tagsFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tags
     */
    select?: tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tags
     */
    omit?: tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagsInclude<ExtArgs> | null
    /**
     * Filter, which tags to fetch.
     */
    where?: tagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tags to fetch.
     */
    orderBy?: tagsOrderByWithRelationInput | tagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tags.
     */
    cursor?: tagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tags.
     */
    distinct?: TagsScalarFieldEnum | TagsScalarFieldEnum[]
  }

  /**
   * tags findFirstOrThrow
   */
  export type tagsFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tags
     */
    select?: tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tags
     */
    omit?: tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagsInclude<ExtArgs> | null
    /**
     * Filter, which tags to fetch.
     */
    where?: tagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tags to fetch.
     */
    orderBy?: tagsOrderByWithRelationInput | tagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for tags.
     */
    cursor?: tagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tags.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of tags.
     */
    distinct?: TagsScalarFieldEnum | TagsScalarFieldEnum[]
  }

  /**
   * tags findMany
   */
  export type tagsFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tags
     */
    select?: tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tags
     */
    omit?: tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagsInclude<ExtArgs> | null
    /**
     * Filter, which tags to fetch.
     */
    where?: tagsWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of tags to fetch.
     */
    orderBy?: tagsOrderByWithRelationInput | tagsOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing tags.
     */
    cursor?: tagsWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` tags from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` tags.
     */
    skip?: number
    distinct?: TagsScalarFieldEnum | TagsScalarFieldEnum[]
  }

  /**
   * tags create
   */
  export type tagsCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tags
     */
    select?: tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tags
     */
    omit?: tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagsInclude<ExtArgs> | null
    /**
     * The data needed to create a tags.
     */
    data: XOR<tagsCreateInput, tagsUncheckedCreateInput>
  }

  /**
   * tags createMany
   */
  export type tagsCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many tags.
     */
    data: tagsCreateManyInput | tagsCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * tags update
   */
  export type tagsUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tags
     */
    select?: tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tags
     */
    omit?: tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagsInclude<ExtArgs> | null
    /**
     * The data needed to update a tags.
     */
    data: XOR<tagsUpdateInput, tagsUncheckedUpdateInput>
    /**
     * Choose, which tags to update.
     */
    where: tagsWhereUniqueInput
  }

  /**
   * tags updateMany
   */
  export type tagsUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update tags.
     */
    data: XOR<tagsUpdateManyMutationInput, tagsUncheckedUpdateManyInput>
    /**
     * Filter which tags to update
     */
    where?: tagsWhereInput
    /**
     * Limit how many tags to update.
     */
    limit?: number
  }

  /**
   * tags upsert
   */
  export type tagsUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tags
     */
    select?: tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tags
     */
    omit?: tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagsInclude<ExtArgs> | null
    /**
     * The filter to search for the tags to update in case it exists.
     */
    where: tagsWhereUniqueInput
    /**
     * In case the tags found by the `where` argument doesn't exist, create a new tags with this data.
     */
    create: XOR<tagsCreateInput, tagsUncheckedCreateInput>
    /**
     * In case the tags was found with the provided `where` argument, update it with this data.
     */
    update: XOR<tagsUpdateInput, tagsUncheckedUpdateInput>
  }

  /**
   * tags delete
   */
  export type tagsDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tags
     */
    select?: tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tags
     */
    omit?: tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagsInclude<ExtArgs> | null
    /**
     * Filter which tags to delete.
     */
    where: tagsWhereUniqueInput
  }

  /**
   * tags deleteMany
   */
  export type tagsDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which tags to delete
     */
    where?: tagsWhereInput
    /**
     * Limit how many tags to delete.
     */
    limit?: number
  }

  /**
   * tags.note_tags
   */
  export type tags$note_tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the note_tags
     */
    select?: note_tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the note_tags
     */
    omit?: note_tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: note_tagsInclude<ExtArgs> | null
    where?: note_tagsWhereInput
    orderBy?: note_tagsOrderByWithRelationInput | note_tagsOrderByWithRelationInput[]
    cursor?: note_tagsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: Note_tagsScalarFieldEnum | Note_tagsScalarFieldEnum[]
  }

  /**
   * tags without action
   */
  export type tagsDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tags
     */
    select?: tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tags
     */
    omit?: tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagsInclude<ExtArgs> | null
  }


  /**
   * Model user
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    name: string | null
    email: string | null
    emailVerified: boolean | null
    image: string | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    name: number
    email: number
    emailVerified: number
    image: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    name?: true
    email?: true
    emailVerified?: true
    image?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which user to aggregate.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type userGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: userWhereInput
    orderBy?: userOrderByWithAggregationInput | userOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: userScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image: string | null
    createdAt: Date
    updatedAt: Date
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends userGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type userSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
    folders?: boolean | user$foldersArgs<ExtArgs>
    notes?: boolean | user$notesArgs<ExtArgs>
    shares?: boolean | user$sharesArgs<ExtArgs>
    tags?: boolean | user$tagsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>



  export type userSelectScalar = {
    id?: boolean
    name?: boolean
    email?: boolean
    emailVerified?: boolean
    image?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type userOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "name" | "email" | "emailVerified" | "image" | "createdAt" | "updatedAt", ExtArgs["result"]["user"]>
  export type userInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    folders?: boolean | user$foldersArgs<ExtArgs>
    notes?: boolean | user$notesArgs<ExtArgs>
    shares?: boolean | user$sharesArgs<ExtArgs>
    tags?: boolean | user$tagsArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }

  export type $userPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "user"
    objects: {
      folders: Prisma.$foldersPayload<ExtArgs>[]
      notes: Prisma.$notesPayload<ExtArgs>[]
      shares: Prisma.$sharesPayload<ExtArgs>[]
      tags: Prisma.$tagsPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      name: string
      email: string
      emailVerified: boolean
      image: string | null
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type userGetPayload<S extends boolean | null | undefined | userDefaultArgs> = $Result.GetResult<Prisma.$userPayload, S>

  type userCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<userFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface userDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['user'], meta: { name: 'user' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {userFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends userFindUniqueArgs>(args: SelectSubset<T, userFindUniqueArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {userFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends userFindUniqueOrThrowArgs>(args: SelectSubset<T, userFindUniqueOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends userFindFirstArgs>(args?: SelectSubset<T, userFindFirstArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends userFindFirstOrThrowArgs>(args?: SelectSubset<T, userFindFirstOrThrowArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends userFindManyArgs>(args?: SelectSubset<T, userFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {userCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends userCreateArgs>(args: SelectSubset<T, userCreateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {userCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends userCreateManyArgs>(args?: SelectSubset<T, userCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a User.
     * @param {userDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends userDeleteArgs>(args: SelectSubset<T, userDeleteArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {userUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends userUpdateArgs>(args: SelectSubset<T, userUpdateArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {userDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends userDeleteManyArgs>(args?: SelectSubset<T, userDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends userUpdateManyArgs>(args: SelectSubset<T, userUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one User.
     * @param {userUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends userUpsertArgs>(args: SelectSubset<T, userUpsertArgs<ExtArgs>>): Prisma__userClient<$Result.GetResult<Prisma.$userPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends userCountArgs>(
      args?: Subset<T, userCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {userGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends userGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: userGroupByArgs['orderBy'] }
        : { orderBy?: userGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, userGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the user model
   */
  readonly fields: userFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for user.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__userClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    folders<T extends user$foldersArgs<ExtArgs> = {}>(args?: Subset<T, user$foldersArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$foldersPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    notes<T extends user$notesArgs<ExtArgs> = {}>(args?: Subset<T, user$notesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$notesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    shares<T extends user$sharesArgs<ExtArgs> = {}>(args?: Subset<T, user$sharesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$sharesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    tags<T extends user$tagsArgs<ExtArgs> = {}>(args?: Subset<T, user$tagsArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$tagsPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the user model
   */
  interface userFieldRefs {
    readonly id: FieldRef<"user", 'String'>
    readonly name: FieldRef<"user", 'String'>
    readonly email: FieldRef<"user", 'String'>
    readonly emailVerified: FieldRef<"user", 'Boolean'>
    readonly image: FieldRef<"user", 'String'>
    readonly createdAt: FieldRef<"user", 'DateTime'>
    readonly updatedAt: FieldRef<"user", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * user findUnique
   */
  export type userFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }

  /**
   * user findUniqueOrThrow
   */
  export type userFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where: userWhereUniqueInput
  }

  /**
   * user findFirst
   */
  export type userFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user findFirstOrThrow
   */
  export type userFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which user to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user findMany
   */
  export type userFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter, which users to fetch.
     */
    where?: userWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of users to fetch.
     */
    orderBy?: userOrderByWithRelationInput | userOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing users.
     */
    cursor?: userWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * user create
   */
  export type userCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The data needed to create a user.
     */
    data: XOR<userCreateInput, userUncheckedCreateInput>
  }

  /**
   * user createMany
   */
  export type userCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many users.
     */
    data: userCreateManyInput | userCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * user update
   */
  export type userUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The data needed to update a user.
     */
    data: XOR<userUpdateInput, userUncheckedUpdateInput>
    /**
     * Choose, which user to update.
     */
    where: userWhereUniqueInput
  }

  /**
   * user updateMany
   */
  export type userUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update users.
     */
    data: XOR<userUpdateManyMutationInput, userUncheckedUpdateManyInput>
    /**
     * Filter which users to update
     */
    where?: userWhereInput
    /**
     * Limit how many users to update.
     */
    limit?: number
  }

  /**
   * user upsert
   */
  export type userUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * The filter to search for the user to update in case it exists.
     */
    where: userWhereUniqueInput
    /**
     * In case the user found by the `where` argument doesn't exist, create a new user with this data.
     */
    create: XOR<userCreateInput, userUncheckedCreateInput>
    /**
     * In case the user was found with the provided `where` argument, update it with this data.
     */
    update: XOR<userUpdateInput, userUncheckedUpdateInput>
  }

  /**
   * user delete
   */
  export type userDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
    /**
     * Filter which user to delete.
     */
    where: userWhereUniqueInput
  }

  /**
   * user deleteMany
   */
  export type userDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which users to delete
     */
    where?: userWhereInput
    /**
     * Limit how many users to delete.
     */
    limit?: number
  }

  /**
   * user.folders
   */
  export type user$foldersArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the folders
     */
    select?: foldersSelect<ExtArgs> | null
    /**
     * Omit specific fields from the folders
     */
    omit?: foldersOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: foldersInclude<ExtArgs> | null
    where?: foldersWhereInput
    orderBy?: foldersOrderByWithRelationInput | foldersOrderByWithRelationInput[]
    cursor?: foldersWhereUniqueInput
    take?: number
    skip?: number
    distinct?: FoldersScalarFieldEnum | FoldersScalarFieldEnum[]
  }

  /**
   * user.notes
   */
  export type user$notesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the notes
     */
    select?: notesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the notes
     */
    omit?: notesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: notesInclude<ExtArgs> | null
    where?: notesWhereInput
    orderBy?: notesOrderByWithRelationInput | notesOrderByWithRelationInput[]
    cursor?: notesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: NotesScalarFieldEnum | NotesScalarFieldEnum[]
  }

  /**
   * user.shares
   */
  export type user$sharesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the shares
     */
    select?: sharesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the shares
     */
    omit?: sharesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: sharesInclude<ExtArgs> | null
    where?: sharesWhereInput
    orderBy?: sharesOrderByWithRelationInput | sharesOrderByWithRelationInput[]
    cursor?: sharesWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SharesScalarFieldEnum | SharesScalarFieldEnum[]
  }

  /**
   * user.tags
   */
  export type user$tagsArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the tags
     */
    select?: tagsSelect<ExtArgs> | null
    /**
     * Omit specific fields from the tags
     */
    omit?: tagsOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: tagsInclude<ExtArgs> | null
    where?: tagsWhereInput
    orderBy?: tagsOrderByWithRelationInput | tagsOrderByWithRelationInput[]
    cursor?: tagsWhereUniqueInput
    take?: number
    skip?: number
    distinct?: TagsScalarFieldEnum | TagsScalarFieldEnum[]
  }

  /**
   * user without action
   */
  export type userDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the user
     */
    select?: userSelect<ExtArgs> | null
    /**
     * Omit specific fields from the user
     */
    omit?: userOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: userInclude<ExtArgs> | null
  }


  /**
   * Model verification
   */

  export type AggregateVerification = {
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  export type VerificationMinAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationMaxAggregateOutputType = {
    id: string | null
    identifier: string | null
    value: string | null
    expiresAt: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type VerificationCountAggregateOutputType = {
    id: number
    identifier: number
    value: number
    expiresAt: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type VerificationMinAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationMaxAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
  }

  export type VerificationCountAggregateInputType = {
    id?: true
    identifier?: true
    value?: true
    expiresAt?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type VerificationAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which verification to aggregate.
     */
    where?: verificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of verifications to fetch.
     */
    orderBy?: verificationOrderByWithRelationInput | verificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: verificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned verifications
    **/
    _count?: true | VerificationCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: VerificationMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: VerificationMaxAggregateInputType
  }

  export type GetVerificationAggregateType<T extends VerificationAggregateArgs> = {
        [P in keyof T & keyof AggregateVerification]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateVerification[P]>
      : GetScalarType<T[P], AggregateVerification[P]>
  }




  export type verificationGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: verificationWhereInput
    orderBy?: verificationOrderByWithAggregationInput | verificationOrderByWithAggregationInput[]
    by: VerificationScalarFieldEnum[] | VerificationScalarFieldEnum
    having?: verificationScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: VerificationCountAggregateInputType | true
    _min?: VerificationMinAggregateInputType
    _max?: VerificationMaxAggregateInputType
  }

  export type VerificationGroupByOutputType = {
    id: string
    identifier: string
    value: string
    expiresAt: Date
    createdAt: Date | null
    updatedAt: Date | null
    _count: VerificationCountAggregateOutputType | null
    _min: VerificationMinAggregateOutputType | null
    _max: VerificationMaxAggregateOutputType | null
  }

  type GetVerificationGroupByPayload<T extends verificationGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<VerificationGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof VerificationGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], VerificationGroupByOutputType[P]>
            : GetScalarType<T[P], VerificationGroupByOutputType[P]>
        }
      >
    >


  export type verificationSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["verification"]>



  export type verificationSelectScalar = {
    id?: boolean
    identifier?: boolean
    value?: boolean
    expiresAt?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type verificationOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "identifier" | "value" | "expiresAt" | "createdAt" | "updatedAt", ExtArgs["result"]["verification"]>

  export type $verificationPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "verification"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      identifier: string
      value: string
      expiresAt: Date
      createdAt: Date | null
      updatedAt: Date | null
    }, ExtArgs["result"]["verification"]>
    composites: {}
  }

  type verificationGetPayload<S extends boolean | null | undefined | verificationDefaultArgs> = $Result.GetResult<Prisma.$verificationPayload, S>

  type verificationCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<verificationFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: VerificationCountAggregateInputType | true
    }

  export interface verificationDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['verification'], meta: { name: 'verification' } }
    /**
     * Find zero or one Verification that matches the filter.
     * @param {verificationFindUniqueArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends verificationFindUniqueArgs>(args: SelectSubset<T, verificationFindUniqueArgs<ExtArgs>>): Prisma__verificationClient<$Result.GetResult<Prisma.$verificationPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Verification that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {verificationFindUniqueOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends verificationFindUniqueOrThrowArgs>(args: SelectSubset<T, verificationFindUniqueOrThrowArgs<ExtArgs>>): Prisma__verificationClient<$Result.GetResult<Prisma.$verificationPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {verificationFindFirstArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends verificationFindFirstArgs>(args?: SelectSubset<T, verificationFindFirstArgs<ExtArgs>>): Prisma__verificationClient<$Result.GetResult<Prisma.$verificationPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Verification that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {verificationFindFirstOrThrowArgs} args - Arguments to find a Verification
     * @example
     * // Get one Verification
     * const verification = await prisma.verification.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends verificationFindFirstOrThrowArgs>(args?: SelectSubset<T, verificationFindFirstOrThrowArgs<ExtArgs>>): Prisma__verificationClient<$Result.GetResult<Prisma.$verificationPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Verifications that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {verificationFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Verifications
     * const verifications = await prisma.verification.findMany()
     * 
     * // Get first 10 Verifications
     * const verifications = await prisma.verification.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const verificationWithIdOnly = await prisma.verification.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends verificationFindManyArgs>(args?: SelectSubset<T, verificationFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$verificationPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Verification.
     * @param {verificationCreateArgs} args - Arguments to create a Verification.
     * @example
     * // Create one Verification
     * const Verification = await prisma.verification.create({
     *   data: {
     *     // ... data to create a Verification
     *   }
     * })
     * 
     */
    create<T extends verificationCreateArgs>(args: SelectSubset<T, verificationCreateArgs<ExtArgs>>): Prisma__verificationClient<$Result.GetResult<Prisma.$verificationPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Verifications.
     * @param {verificationCreateManyArgs} args - Arguments to create many Verifications.
     * @example
     * // Create many Verifications
     * const verification = await prisma.verification.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends verificationCreateManyArgs>(args?: SelectSubset<T, verificationCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Delete a Verification.
     * @param {verificationDeleteArgs} args - Arguments to delete one Verification.
     * @example
     * // Delete one Verification
     * const Verification = await prisma.verification.delete({
     *   where: {
     *     // ... filter to delete one Verification
     *   }
     * })
     * 
     */
    delete<T extends verificationDeleteArgs>(args: SelectSubset<T, verificationDeleteArgs<ExtArgs>>): Prisma__verificationClient<$Result.GetResult<Prisma.$verificationPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Verification.
     * @param {verificationUpdateArgs} args - Arguments to update one Verification.
     * @example
     * // Update one Verification
     * const verification = await prisma.verification.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends verificationUpdateArgs>(args: SelectSubset<T, verificationUpdateArgs<ExtArgs>>): Prisma__verificationClient<$Result.GetResult<Prisma.$verificationPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Verifications.
     * @param {verificationDeleteManyArgs} args - Arguments to filter Verifications to delete.
     * @example
     * // Delete a few Verifications
     * const { count } = await prisma.verification.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends verificationDeleteManyArgs>(args?: SelectSubset<T, verificationDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {verificationUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Verifications
     * const verification = await prisma.verification.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends verificationUpdateManyArgs>(args: SelectSubset<T, verificationUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create or update one Verification.
     * @param {verificationUpsertArgs} args - Arguments to update or create a Verification.
     * @example
     * // Update or create a Verification
     * const verification = await prisma.verification.upsert({
     *   create: {
     *     // ... data to create a Verification
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Verification we want to update
     *   }
     * })
     */
    upsert<T extends verificationUpsertArgs>(args: SelectSubset<T, verificationUpsertArgs<ExtArgs>>): Prisma__verificationClient<$Result.GetResult<Prisma.$verificationPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Verifications.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {verificationCountArgs} args - Arguments to filter Verifications to count.
     * @example
     * // Count the number of Verifications
     * const count = await prisma.verification.count({
     *   where: {
     *     // ... the filter for the Verifications we want to count
     *   }
     * })
    **/
    count<T extends verificationCountArgs>(
      args?: Subset<T, verificationCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], VerificationCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {VerificationAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends VerificationAggregateArgs>(args: Subset<T, VerificationAggregateArgs>): Prisma.PrismaPromise<GetVerificationAggregateType<T>>

    /**
     * Group by Verification.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {verificationGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends verificationGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: verificationGroupByArgs['orderBy'] }
        : { orderBy?: verificationGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, verificationGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetVerificationGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the verification model
   */
  readonly fields: verificationFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for verification.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__verificationClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the verification model
   */
  interface verificationFieldRefs {
    readonly id: FieldRef<"verification", 'String'>
    readonly identifier: FieldRef<"verification", 'String'>
    readonly value: FieldRef<"verification", 'String'>
    readonly expiresAt: FieldRef<"verification", 'DateTime'>
    readonly createdAt: FieldRef<"verification", 'DateTime'>
    readonly updatedAt: FieldRef<"verification", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * verification findUnique
   */
  export type verificationFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification
     */
    select?: verificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification
     */
    omit?: verificationOmit<ExtArgs> | null
    /**
     * Filter, which verification to fetch.
     */
    where: verificationWhereUniqueInput
  }

  /**
   * verification findUniqueOrThrow
   */
  export type verificationFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification
     */
    select?: verificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification
     */
    omit?: verificationOmit<ExtArgs> | null
    /**
     * Filter, which verification to fetch.
     */
    where: verificationWhereUniqueInput
  }

  /**
   * verification findFirst
   */
  export type verificationFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification
     */
    select?: verificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification
     */
    omit?: verificationOmit<ExtArgs> | null
    /**
     * Filter, which verification to fetch.
     */
    where?: verificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of verifications to fetch.
     */
    orderBy?: verificationOrderByWithRelationInput | verificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for verifications.
     */
    cursor?: verificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * verification findFirstOrThrow
   */
  export type verificationFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification
     */
    select?: verificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification
     */
    omit?: verificationOmit<ExtArgs> | null
    /**
     * Filter, which verification to fetch.
     */
    where?: verificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of verifications to fetch.
     */
    orderBy?: verificationOrderByWithRelationInput | verificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for verifications.
     */
    cursor?: verificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` verifications.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of verifications.
     */
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * verification findMany
   */
  export type verificationFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification
     */
    select?: verificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification
     */
    omit?: verificationOmit<ExtArgs> | null
    /**
     * Filter, which verifications to fetch.
     */
    where?: verificationWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of verifications to fetch.
     */
    orderBy?: verificationOrderByWithRelationInput | verificationOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing verifications.
     */
    cursor?: verificationWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` verifications from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` verifications.
     */
    skip?: number
    distinct?: VerificationScalarFieldEnum | VerificationScalarFieldEnum[]
  }

  /**
   * verification create
   */
  export type verificationCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification
     */
    select?: verificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification
     */
    omit?: verificationOmit<ExtArgs> | null
    /**
     * The data needed to create a verification.
     */
    data: XOR<verificationCreateInput, verificationUncheckedCreateInput>
  }

  /**
   * verification createMany
   */
  export type verificationCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many verifications.
     */
    data: verificationCreateManyInput | verificationCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * verification update
   */
  export type verificationUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification
     */
    select?: verificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification
     */
    omit?: verificationOmit<ExtArgs> | null
    /**
     * The data needed to update a verification.
     */
    data: XOR<verificationUpdateInput, verificationUncheckedUpdateInput>
    /**
     * Choose, which verification to update.
     */
    where: verificationWhereUniqueInput
  }

  /**
   * verification updateMany
   */
  export type verificationUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update verifications.
     */
    data: XOR<verificationUpdateManyMutationInput, verificationUncheckedUpdateManyInput>
    /**
     * Filter which verifications to update
     */
    where?: verificationWhereInput
    /**
     * Limit how many verifications to update.
     */
    limit?: number
  }

  /**
   * verification upsert
   */
  export type verificationUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification
     */
    select?: verificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification
     */
    omit?: verificationOmit<ExtArgs> | null
    /**
     * The filter to search for the verification to update in case it exists.
     */
    where: verificationWhereUniqueInput
    /**
     * In case the verification found by the `where` argument doesn't exist, create a new verification with this data.
     */
    create: XOR<verificationCreateInput, verificationUncheckedCreateInput>
    /**
     * In case the verification was found with the provided `where` argument, update it with this data.
     */
    update: XOR<verificationUpdateInput, verificationUncheckedUpdateInput>
  }

  /**
   * verification delete
   */
  export type verificationDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification
     */
    select?: verificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification
     */
    omit?: verificationOmit<ExtArgs> | null
    /**
     * Filter which verification to delete.
     */
    where: verificationWhereUniqueInput
  }

  /**
   * verification deleteMany
   */
  export type verificationDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which verifications to delete
     */
    where?: verificationWhereInput
    /**
     * Limit how many verifications to delete.
     */
    limit?: number
  }

  /**
   * verification without action
   */
  export type verificationDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the verification
     */
    select?: verificationSelect<ExtArgs> | null
    /**
     * Omit specific fields from the verification
     */
    omit?: verificationOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const AccountScalarFieldEnum: {
    id: 'id',
    accountId: 'accountId',
    providerId: 'providerId',
    userId: 'userId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    idToken: 'idToken',
    accessTokenExpiresAt: 'accessTokenExpiresAt',
    refreshTokenExpiresAt: 'refreshTokenExpiresAt',
    scope: 'scope',
    password: 'password',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type AccountScalarFieldEnum = (typeof AccountScalarFieldEnum)[keyof typeof AccountScalarFieldEnum]


  export const Auth_sessionsScalarFieldEnum: {
    id: 'id',
    user_id: 'user_id',
    expires_at: 'expires_at',
    created_at: 'created_at'
  };

  export type Auth_sessionsScalarFieldEnum = (typeof Auth_sessionsScalarFieldEnum)[keyof typeof Auth_sessionsScalarFieldEnum]


  export const Auth_usersScalarFieldEnum: {
    id: 'id',
    email: 'email',
    email_verified: 'email_verified',
    password: 'password',
    name: 'name',
    image: 'image',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type Auth_usersScalarFieldEnum = (typeof Auth_usersScalarFieldEnum)[keyof typeof Auth_usersScalarFieldEnum]


  export const Auth_verification_tokensScalarFieldEnum: {
    identifier: 'identifier',
    token: 'token',
    expires_at: 'expires_at'
  };

  export type Auth_verification_tokensScalarFieldEnum = (typeof Auth_verification_tokensScalarFieldEnum)[keyof typeof Auth_verification_tokensScalarFieldEnum]


  export const FoldersScalarFieldEnum: {
    id: 'id',
    name: 'name',
    user_id: 'user_id',
    parent_id: 'parent_id',
    created_at: 'created_at',
    updated_at: 'updated_at'
  };

  export type FoldersScalarFieldEnum = (typeof FoldersScalarFieldEnum)[keyof typeof FoldersScalarFieldEnum]


  export const Note_tagsScalarFieldEnum: {
    note_id: 'note_id',
    tag_id: 'tag_id'
  };

  export type Note_tagsScalarFieldEnum = (typeof Note_tagsScalarFieldEnum)[keyof typeof Note_tagsScalarFieldEnum]


  export const NotesScalarFieldEnum: {
    id: 'id',
    name: 'name',
    content: 'content',
    user_id: 'user_id',
    parent_id: 'parent_id',
    created_at: 'created_at',
    updated_at: 'updated_at',
    is_pinned: 'is_pinned',
    is_public: 'is_public'
  };

  export type NotesScalarFieldEnum = (typeof NotesScalarFieldEnum)[keyof typeof NotesScalarFieldEnum]


  export const Pending_sharesScalarFieldEnum: {
    id: 'id',
    note_id: 'note_id',
    user_email: 'user_email',
    permission: 'permission'
  };

  export type Pending_sharesScalarFieldEnum = (typeof Pending_sharesScalarFieldEnum)[keyof typeof Pending_sharesScalarFieldEnum]


  export const SessionScalarFieldEnum: {
    id: 'id',
    expiresAt: 'expiresAt',
    token: 'token',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    userId: 'userId'
  };

  export type SessionScalarFieldEnum = (typeof SessionScalarFieldEnum)[keyof typeof SessionScalarFieldEnum]


  export const SharesScalarFieldEnum: {
    id: 'id',
    note_id: 'note_id',
    user_id: 'user_id',
    created_at: 'created_at',
    expires_at: 'expires_at',
    permission: 'permission'
  };

  export type SharesScalarFieldEnum = (typeof SharesScalarFieldEnum)[keyof typeof SharesScalarFieldEnum]


  export const TagsScalarFieldEnum: {
    id: 'id',
    name: 'name',
    user_id: 'user_id',
    created_at: 'created_at'
  };

  export type TagsScalarFieldEnum = (typeof TagsScalarFieldEnum)[keyof typeof TagsScalarFieldEnum]


  export const UserScalarFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    emailVerified: 'emailVerified',
    image: 'image',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const VerificationScalarFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    value: 'value',
    expiresAt: 'expiresAt',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type VerificationScalarFieldEnum = (typeof VerificationScalarFieldEnum)[keyof typeof VerificationScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  export const accountOrderByRelevanceFieldEnum: {
    id: 'id',
    accountId: 'accountId',
    providerId: 'providerId',
    userId: 'userId',
    accessToken: 'accessToken',
    refreshToken: 'refreshToken',
    idToken: 'idToken',
    scope: 'scope',
    password: 'password'
  };

  export type accountOrderByRelevanceFieldEnum = (typeof accountOrderByRelevanceFieldEnum)[keyof typeof accountOrderByRelevanceFieldEnum]


  export const auth_sessionsOrderByRelevanceFieldEnum: {
    id: 'id',
    user_id: 'user_id'
  };

  export type auth_sessionsOrderByRelevanceFieldEnum = (typeof auth_sessionsOrderByRelevanceFieldEnum)[keyof typeof auth_sessionsOrderByRelevanceFieldEnum]


  export const auth_usersOrderByRelevanceFieldEnum: {
    id: 'id',
    email: 'email',
    password: 'password',
    name: 'name',
    image: 'image'
  };

  export type auth_usersOrderByRelevanceFieldEnum = (typeof auth_usersOrderByRelevanceFieldEnum)[keyof typeof auth_usersOrderByRelevanceFieldEnum]


  export const auth_verification_tokensOrderByRelevanceFieldEnum: {
    identifier: 'identifier',
    token: 'token'
  };

  export type auth_verification_tokensOrderByRelevanceFieldEnum = (typeof auth_verification_tokensOrderByRelevanceFieldEnum)[keyof typeof auth_verification_tokensOrderByRelevanceFieldEnum]


  export const foldersOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    user_id: 'user_id',
    parent_id: 'parent_id'
  };

  export type foldersOrderByRelevanceFieldEnum = (typeof foldersOrderByRelevanceFieldEnum)[keyof typeof foldersOrderByRelevanceFieldEnum]


  export const note_tagsOrderByRelevanceFieldEnum: {
    note_id: 'note_id',
    tag_id: 'tag_id'
  };

  export type note_tagsOrderByRelevanceFieldEnum = (typeof note_tagsOrderByRelevanceFieldEnum)[keyof typeof note_tagsOrderByRelevanceFieldEnum]


  export const notesOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    content: 'content',
    user_id: 'user_id',
    parent_id: 'parent_id'
  };

  export type notesOrderByRelevanceFieldEnum = (typeof notesOrderByRelevanceFieldEnum)[keyof typeof notesOrderByRelevanceFieldEnum]


  export const pending_sharesOrderByRelevanceFieldEnum: {
    id: 'id',
    note_id: 'note_id',
    user_email: 'user_email'
  };

  export type pending_sharesOrderByRelevanceFieldEnum = (typeof pending_sharesOrderByRelevanceFieldEnum)[keyof typeof pending_sharesOrderByRelevanceFieldEnum]


  export const sessionOrderByRelevanceFieldEnum: {
    id: 'id',
    token: 'token',
    ipAddress: 'ipAddress',
    userAgent: 'userAgent',
    userId: 'userId'
  };

  export type sessionOrderByRelevanceFieldEnum = (typeof sessionOrderByRelevanceFieldEnum)[keyof typeof sessionOrderByRelevanceFieldEnum]


  export const sharesOrderByRelevanceFieldEnum: {
    id: 'id',
    note_id: 'note_id',
    user_id: 'user_id'
  };

  export type sharesOrderByRelevanceFieldEnum = (typeof sharesOrderByRelevanceFieldEnum)[keyof typeof sharesOrderByRelevanceFieldEnum]


  export const tagsOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    user_id: 'user_id'
  };

  export type tagsOrderByRelevanceFieldEnum = (typeof tagsOrderByRelevanceFieldEnum)[keyof typeof tagsOrderByRelevanceFieldEnum]


  export const userOrderByRelevanceFieldEnum: {
    id: 'id',
    name: 'name',
    email: 'email',
    image: 'image'
  };

  export type userOrderByRelevanceFieldEnum = (typeof userOrderByRelevanceFieldEnum)[keyof typeof userOrderByRelevanceFieldEnum]


  export const verificationOrderByRelevanceFieldEnum: {
    id: 'id',
    identifier: 'identifier',
    value: 'value'
  };

  export type verificationOrderByRelevanceFieldEnum = (typeof verificationOrderByRelevanceFieldEnum)[keyof typeof verificationOrderByRelevanceFieldEnum]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'pending_shares_permission'
   */
  export type Enumpending_shares_permissionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'pending_shares_permission'>
    


  /**
   * Reference to a field of type 'shares_permission'
   */
  export type Enumshares_permissionFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'shares_permission'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    
  /**
   * Deep Input Types
   */


  export type accountWhereInput = {
    AND?: accountWhereInput | accountWhereInput[]
    OR?: accountWhereInput[]
    NOT?: accountWhereInput | accountWhereInput[]
    id?: StringFilter<"account"> | string
    accountId?: StringFilter<"account"> | string
    providerId?: StringFilter<"account"> | string
    userId?: StringFilter<"account"> | string
    accessToken?: StringNullableFilter<"account"> | string | null
    refreshToken?: StringNullableFilter<"account"> | string | null
    idToken?: StringNullableFilter<"account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"account"> | Date | string | null
    scope?: StringNullableFilter<"account"> | string | null
    password?: StringNullableFilter<"account"> | string | null
    createdAt?: DateTimeFilter<"account"> | Date | string
    updatedAt?: DateTimeFilter<"account"> | Date | string
  }

  export type accountOrderByWithRelationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _relevance?: accountOrderByRelevanceInput
  }

  export type accountWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: accountWhereInput | accountWhereInput[]
    OR?: accountWhereInput[]
    NOT?: accountWhereInput | accountWhereInput[]
    accountId?: StringFilter<"account"> | string
    providerId?: StringFilter<"account"> | string
    userId?: StringFilter<"account"> | string
    accessToken?: StringNullableFilter<"account"> | string | null
    refreshToken?: StringNullableFilter<"account"> | string | null
    idToken?: StringNullableFilter<"account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableFilter<"account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableFilter<"account"> | Date | string | null
    scope?: StringNullableFilter<"account"> | string | null
    password?: StringNullableFilter<"account"> | string | null
    createdAt?: DateTimeFilter<"account"> | Date | string
    updatedAt?: DateTimeFilter<"account"> | Date | string
  }, "id">

  export type accountOrderByWithAggregationInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrderInput | SortOrder
    refreshToken?: SortOrderInput | SortOrder
    idToken?: SortOrderInput | SortOrder
    accessTokenExpiresAt?: SortOrderInput | SortOrder
    refreshTokenExpiresAt?: SortOrderInput | SortOrder
    scope?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: accountCountOrderByAggregateInput
    _max?: accountMaxOrderByAggregateInput
    _min?: accountMinOrderByAggregateInput
  }

  export type accountScalarWhereWithAggregatesInput = {
    AND?: accountScalarWhereWithAggregatesInput | accountScalarWhereWithAggregatesInput[]
    OR?: accountScalarWhereWithAggregatesInput[]
    NOT?: accountScalarWhereWithAggregatesInput | accountScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"account"> | string
    accountId?: StringWithAggregatesFilter<"account"> | string
    providerId?: StringWithAggregatesFilter<"account"> | string
    userId?: StringWithAggregatesFilter<"account"> | string
    accessToken?: StringNullableWithAggregatesFilter<"account"> | string | null
    refreshToken?: StringNullableWithAggregatesFilter<"account"> | string | null
    idToken?: StringNullableWithAggregatesFilter<"account"> | string | null
    accessTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"account"> | Date | string | null
    refreshTokenExpiresAt?: DateTimeNullableWithAggregatesFilter<"account"> | Date | string | null
    scope?: StringNullableWithAggregatesFilter<"account"> | string | null
    password?: StringNullableWithAggregatesFilter<"account"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"account"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"account"> | Date | string
  }

  export type auth_sessionsWhereInput = {
    AND?: auth_sessionsWhereInput | auth_sessionsWhereInput[]
    OR?: auth_sessionsWhereInput[]
    NOT?: auth_sessionsWhereInput | auth_sessionsWhereInput[]
    id?: StringFilter<"auth_sessions"> | string
    user_id?: StringFilter<"auth_sessions"> | string
    expires_at?: DateTimeFilter<"auth_sessions"> | Date | string
    created_at?: DateTimeNullableFilter<"auth_sessions"> | Date | string | null
    auth_users?: XOR<Auth_usersScalarRelationFilter, auth_usersWhereInput>
  }

  export type auth_sessionsOrderByWithRelationInput = {
    id?: SortOrder
    user_id?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrderInput | SortOrder
    auth_users?: auth_usersOrderByWithRelationInput
    _relevance?: auth_sessionsOrderByRelevanceInput
  }

  export type auth_sessionsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: auth_sessionsWhereInput | auth_sessionsWhereInput[]
    OR?: auth_sessionsWhereInput[]
    NOT?: auth_sessionsWhereInput | auth_sessionsWhereInput[]
    user_id?: StringFilter<"auth_sessions"> | string
    expires_at?: DateTimeFilter<"auth_sessions"> | Date | string
    created_at?: DateTimeNullableFilter<"auth_sessions"> | Date | string | null
    auth_users?: XOR<Auth_usersScalarRelationFilter, auth_usersWhereInput>
  }, "id">

  export type auth_sessionsOrderByWithAggregationInput = {
    id?: SortOrder
    user_id?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: auth_sessionsCountOrderByAggregateInput
    _max?: auth_sessionsMaxOrderByAggregateInput
    _min?: auth_sessionsMinOrderByAggregateInput
  }

  export type auth_sessionsScalarWhereWithAggregatesInput = {
    AND?: auth_sessionsScalarWhereWithAggregatesInput | auth_sessionsScalarWhereWithAggregatesInput[]
    OR?: auth_sessionsScalarWhereWithAggregatesInput[]
    NOT?: auth_sessionsScalarWhereWithAggregatesInput | auth_sessionsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"auth_sessions"> | string
    user_id?: StringWithAggregatesFilter<"auth_sessions"> | string
    expires_at?: DateTimeWithAggregatesFilter<"auth_sessions"> | Date | string
    created_at?: DateTimeNullableWithAggregatesFilter<"auth_sessions"> | Date | string | null
  }

  export type auth_usersWhereInput = {
    AND?: auth_usersWhereInput | auth_usersWhereInput[]
    OR?: auth_usersWhereInput[]
    NOT?: auth_usersWhereInput | auth_usersWhereInput[]
    id?: StringFilter<"auth_users"> | string
    email?: StringFilter<"auth_users"> | string
    email_verified?: BoolNullableFilter<"auth_users"> | boolean | null
    password?: StringNullableFilter<"auth_users"> | string | null
    name?: StringNullableFilter<"auth_users"> | string | null
    image?: StringNullableFilter<"auth_users"> | string | null
    created_at?: DateTimeNullableFilter<"auth_users"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"auth_users"> | Date | string | null
    auth_sessions?: Auth_sessionsListRelationFilter
  }

  export type auth_usersOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    email_verified?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    auth_sessions?: auth_sessionsOrderByRelationAggregateInput
    _relevance?: auth_usersOrderByRelevanceInput
  }

  export type auth_usersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: auth_usersWhereInput | auth_usersWhereInput[]
    OR?: auth_usersWhereInput[]
    NOT?: auth_usersWhereInput | auth_usersWhereInput[]
    email_verified?: BoolNullableFilter<"auth_users"> | boolean | null
    password?: StringNullableFilter<"auth_users"> | string | null
    name?: StringNullableFilter<"auth_users"> | string | null
    image?: StringNullableFilter<"auth_users"> | string | null
    created_at?: DateTimeNullableFilter<"auth_users"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"auth_users"> | Date | string | null
    auth_sessions?: Auth_sessionsListRelationFilter
  }, "id" | "email">

  export type auth_usersOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    email_verified?: SortOrderInput | SortOrder
    password?: SortOrderInput | SortOrder
    name?: SortOrderInput | SortOrder
    image?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: auth_usersCountOrderByAggregateInput
    _max?: auth_usersMaxOrderByAggregateInput
    _min?: auth_usersMinOrderByAggregateInput
  }

  export type auth_usersScalarWhereWithAggregatesInput = {
    AND?: auth_usersScalarWhereWithAggregatesInput | auth_usersScalarWhereWithAggregatesInput[]
    OR?: auth_usersScalarWhereWithAggregatesInput[]
    NOT?: auth_usersScalarWhereWithAggregatesInput | auth_usersScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"auth_users"> | string
    email?: StringWithAggregatesFilter<"auth_users"> | string
    email_verified?: BoolNullableWithAggregatesFilter<"auth_users"> | boolean | null
    password?: StringNullableWithAggregatesFilter<"auth_users"> | string | null
    name?: StringNullableWithAggregatesFilter<"auth_users"> | string | null
    image?: StringNullableWithAggregatesFilter<"auth_users"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"auth_users"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"auth_users"> | Date | string | null
  }

  export type auth_verification_tokensWhereInput = {
    AND?: auth_verification_tokensWhereInput | auth_verification_tokensWhereInput[]
    OR?: auth_verification_tokensWhereInput[]
    NOT?: auth_verification_tokensWhereInput | auth_verification_tokensWhereInput[]
    identifier?: StringFilter<"auth_verification_tokens"> | string
    token?: StringFilter<"auth_verification_tokens"> | string
    expires_at?: DateTimeFilter<"auth_verification_tokens"> | Date | string
  }

  export type auth_verification_tokensOrderByWithRelationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    _relevance?: auth_verification_tokensOrderByRelevanceInput
  }

  export type auth_verification_tokensWhereUniqueInput = Prisma.AtLeast<{
    identifier_token?: auth_verification_tokensIdentifierTokenCompoundUniqueInput
    AND?: auth_verification_tokensWhereInput | auth_verification_tokensWhereInput[]
    OR?: auth_verification_tokensWhereInput[]
    NOT?: auth_verification_tokensWhereInput | auth_verification_tokensWhereInput[]
    identifier?: StringFilter<"auth_verification_tokens"> | string
    token?: StringFilter<"auth_verification_tokens"> | string
    expires_at?: DateTimeFilter<"auth_verification_tokens"> | Date | string
  }, "identifier_token">

  export type auth_verification_tokensOrderByWithAggregationInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
    _count?: auth_verification_tokensCountOrderByAggregateInput
    _max?: auth_verification_tokensMaxOrderByAggregateInput
    _min?: auth_verification_tokensMinOrderByAggregateInput
  }

  export type auth_verification_tokensScalarWhereWithAggregatesInput = {
    AND?: auth_verification_tokensScalarWhereWithAggregatesInput | auth_verification_tokensScalarWhereWithAggregatesInput[]
    OR?: auth_verification_tokensScalarWhereWithAggregatesInput[]
    NOT?: auth_verification_tokensScalarWhereWithAggregatesInput | auth_verification_tokensScalarWhereWithAggregatesInput[]
    identifier?: StringWithAggregatesFilter<"auth_verification_tokens"> | string
    token?: StringWithAggregatesFilter<"auth_verification_tokens"> | string
    expires_at?: DateTimeWithAggregatesFilter<"auth_verification_tokens"> | Date | string
  }

  export type foldersWhereInput = {
    AND?: foldersWhereInput | foldersWhereInput[]
    OR?: foldersWhereInput[]
    NOT?: foldersWhereInput | foldersWhereInput[]
    id?: StringFilter<"folders"> | string
    name?: StringFilter<"folders"> | string
    user_id?: StringFilter<"folders"> | string
    parent_id?: StringNullableFilter<"folders"> | string | null
    created_at?: DateTimeNullableFilter<"folders"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"folders"> | Date | string | null
    folders?: XOR<FoldersNullableScalarRelationFilter, foldersWhereInput> | null
    other_folders?: FoldersListRelationFilter
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    notes?: NotesListRelationFilter
  }

  export type foldersOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    user_id?: SortOrder
    parent_id?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    folders?: foldersOrderByWithRelationInput
    other_folders?: foldersOrderByRelationAggregateInput
    user?: userOrderByWithRelationInput
    notes?: notesOrderByRelationAggregateInput
    _relevance?: foldersOrderByRelevanceInput
  }

  export type foldersWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: foldersWhereInput | foldersWhereInput[]
    OR?: foldersWhereInput[]
    NOT?: foldersWhereInput | foldersWhereInput[]
    name?: StringFilter<"folders"> | string
    user_id?: StringFilter<"folders"> | string
    parent_id?: StringNullableFilter<"folders"> | string | null
    created_at?: DateTimeNullableFilter<"folders"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"folders"> | Date | string | null
    folders?: XOR<FoldersNullableScalarRelationFilter, foldersWhereInput> | null
    other_folders?: FoldersListRelationFilter
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    notes?: NotesListRelationFilter
  }, "id">

  export type foldersOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    user_id?: SortOrder
    parent_id?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    _count?: foldersCountOrderByAggregateInput
    _max?: foldersMaxOrderByAggregateInput
    _min?: foldersMinOrderByAggregateInput
  }

  export type foldersScalarWhereWithAggregatesInput = {
    AND?: foldersScalarWhereWithAggregatesInput | foldersScalarWhereWithAggregatesInput[]
    OR?: foldersScalarWhereWithAggregatesInput[]
    NOT?: foldersScalarWhereWithAggregatesInput | foldersScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"folders"> | string
    name?: StringWithAggregatesFilter<"folders"> | string
    user_id?: StringWithAggregatesFilter<"folders"> | string
    parent_id?: StringNullableWithAggregatesFilter<"folders"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"folders"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"folders"> | Date | string | null
  }

  export type note_tagsWhereInput = {
    AND?: note_tagsWhereInput | note_tagsWhereInput[]
    OR?: note_tagsWhereInput[]
    NOT?: note_tagsWhereInput | note_tagsWhereInput[]
    note_id?: StringFilter<"note_tags"> | string
    tag_id?: StringFilter<"note_tags"> | string
    notes?: XOR<NotesScalarRelationFilter, notesWhereInput>
    tags?: XOR<TagsScalarRelationFilter, tagsWhereInput>
  }

  export type note_tagsOrderByWithRelationInput = {
    note_id?: SortOrder
    tag_id?: SortOrder
    notes?: notesOrderByWithRelationInput
    tags?: tagsOrderByWithRelationInput
    _relevance?: note_tagsOrderByRelevanceInput
  }

  export type note_tagsWhereUniqueInput = Prisma.AtLeast<{
    note_id_tag_id?: note_tagsNote_idTag_idCompoundUniqueInput
    AND?: note_tagsWhereInput | note_tagsWhereInput[]
    OR?: note_tagsWhereInput[]
    NOT?: note_tagsWhereInput | note_tagsWhereInput[]
    note_id?: StringFilter<"note_tags"> | string
    tag_id?: StringFilter<"note_tags"> | string
    notes?: XOR<NotesScalarRelationFilter, notesWhereInput>
    tags?: XOR<TagsScalarRelationFilter, tagsWhereInput>
  }, "note_id_tag_id">

  export type note_tagsOrderByWithAggregationInput = {
    note_id?: SortOrder
    tag_id?: SortOrder
    _count?: note_tagsCountOrderByAggregateInput
    _max?: note_tagsMaxOrderByAggregateInput
    _min?: note_tagsMinOrderByAggregateInput
  }

  export type note_tagsScalarWhereWithAggregatesInput = {
    AND?: note_tagsScalarWhereWithAggregatesInput | note_tagsScalarWhereWithAggregatesInput[]
    OR?: note_tagsScalarWhereWithAggregatesInput[]
    NOT?: note_tagsScalarWhereWithAggregatesInput | note_tagsScalarWhereWithAggregatesInput[]
    note_id?: StringWithAggregatesFilter<"note_tags"> | string
    tag_id?: StringWithAggregatesFilter<"note_tags"> | string
  }

  export type notesWhereInput = {
    AND?: notesWhereInput | notesWhereInput[]
    OR?: notesWhereInput[]
    NOT?: notesWhereInput | notesWhereInput[]
    id?: StringFilter<"notes"> | string
    name?: StringFilter<"notes"> | string
    content?: StringNullableFilter<"notes"> | string | null
    user_id?: StringFilter<"notes"> | string
    parent_id?: StringNullableFilter<"notes"> | string | null
    created_at?: DateTimeNullableFilter<"notes"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"notes"> | Date | string | null
    is_pinned?: BoolNullableFilter<"notes"> | boolean | null
    is_public?: BoolNullableFilter<"notes"> | boolean | null
    note_tags?: Note_tagsListRelationFilter
    folders?: XOR<FoldersNullableScalarRelationFilter, foldersWhereInput> | null
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    shares?: SharesListRelationFilter
  }

  export type notesOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    content?: SortOrderInput | SortOrder
    user_id?: SortOrder
    parent_id?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    is_pinned?: SortOrderInput | SortOrder
    is_public?: SortOrderInput | SortOrder
    note_tags?: note_tagsOrderByRelationAggregateInput
    folders?: foldersOrderByWithRelationInput
    user?: userOrderByWithRelationInput
    shares?: sharesOrderByRelationAggregateInput
    _relevance?: notesOrderByRelevanceInput
  }

  export type notesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: notesWhereInput | notesWhereInput[]
    OR?: notesWhereInput[]
    NOT?: notesWhereInput | notesWhereInput[]
    name?: StringFilter<"notes"> | string
    content?: StringNullableFilter<"notes"> | string | null
    user_id?: StringFilter<"notes"> | string
    parent_id?: StringNullableFilter<"notes"> | string | null
    created_at?: DateTimeNullableFilter<"notes"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"notes"> | Date | string | null
    is_pinned?: BoolNullableFilter<"notes"> | boolean | null
    is_public?: BoolNullableFilter<"notes"> | boolean | null
    note_tags?: Note_tagsListRelationFilter
    folders?: XOR<FoldersNullableScalarRelationFilter, foldersWhereInput> | null
    user?: XOR<UserScalarRelationFilter, userWhereInput>
    shares?: SharesListRelationFilter
  }, "id">

  export type notesOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    content?: SortOrderInput | SortOrder
    user_id?: SortOrder
    parent_id?: SortOrderInput | SortOrder
    created_at?: SortOrderInput | SortOrder
    updated_at?: SortOrderInput | SortOrder
    is_pinned?: SortOrderInput | SortOrder
    is_public?: SortOrderInput | SortOrder
    _count?: notesCountOrderByAggregateInput
    _max?: notesMaxOrderByAggregateInput
    _min?: notesMinOrderByAggregateInput
  }

  export type notesScalarWhereWithAggregatesInput = {
    AND?: notesScalarWhereWithAggregatesInput | notesScalarWhereWithAggregatesInput[]
    OR?: notesScalarWhereWithAggregatesInput[]
    NOT?: notesScalarWhereWithAggregatesInput | notesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"notes"> | string
    name?: StringWithAggregatesFilter<"notes"> | string
    content?: StringNullableWithAggregatesFilter<"notes"> | string | null
    user_id?: StringWithAggregatesFilter<"notes"> | string
    parent_id?: StringNullableWithAggregatesFilter<"notes"> | string | null
    created_at?: DateTimeNullableWithAggregatesFilter<"notes"> | Date | string | null
    updated_at?: DateTimeNullableWithAggregatesFilter<"notes"> | Date | string | null
    is_pinned?: BoolNullableWithAggregatesFilter<"notes"> | boolean | null
    is_public?: BoolNullableWithAggregatesFilter<"notes"> | boolean | null
  }

  export type pending_sharesWhereInput = {
    AND?: pending_sharesWhereInput | pending_sharesWhereInput[]
    OR?: pending_sharesWhereInput[]
    NOT?: pending_sharesWhereInput | pending_sharesWhereInput[]
    id?: StringFilter<"pending_shares"> | string
    note_id?: StringFilter<"pending_shares"> | string
    user_email?: StringFilter<"pending_shares"> | string
    permission?: Enumpending_shares_permissionFilter<"pending_shares"> | $Enums.pending_shares_permission
  }

  export type pending_sharesOrderByWithRelationInput = {
    id?: SortOrder
    note_id?: SortOrder
    user_email?: SortOrder
    permission?: SortOrder
    _relevance?: pending_sharesOrderByRelevanceInput
  }

  export type pending_sharesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: pending_sharesWhereInput | pending_sharesWhereInput[]
    OR?: pending_sharesWhereInput[]
    NOT?: pending_sharesWhereInput | pending_sharesWhereInput[]
    note_id?: StringFilter<"pending_shares"> | string
    user_email?: StringFilter<"pending_shares"> | string
    permission?: Enumpending_shares_permissionFilter<"pending_shares"> | $Enums.pending_shares_permission
  }, "id">

  export type pending_sharesOrderByWithAggregationInput = {
    id?: SortOrder
    note_id?: SortOrder
    user_email?: SortOrder
    permission?: SortOrder
    _count?: pending_sharesCountOrderByAggregateInput
    _max?: pending_sharesMaxOrderByAggregateInput
    _min?: pending_sharesMinOrderByAggregateInput
  }

  export type pending_sharesScalarWhereWithAggregatesInput = {
    AND?: pending_sharesScalarWhereWithAggregatesInput | pending_sharesScalarWhereWithAggregatesInput[]
    OR?: pending_sharesScalarWhereWithAggregatesInput[]
    NOT?: pending_sharesScalarWhereWithAggregatesInput | pending_sharesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"pending_shares"> | string
    note_id?: StringWithAggregatesFilter<"pending_shares"> | string
    user_email?: StringWithAggregatesFilter<"pending_shares"> | string
    permission?: Enumpending_shares_permissionWithAggregatesFilter<"pending_shares"> | $Enums.pending_shares_permission
  }

  export type sessionWhereInput = {
    AND?: sessionWhereInput | sessionWhereInput[]
    OR?: sessionWhereInput[]
    NOT?: sessionWhereInput | sessionWhereInput[]
    id?: StringFilter<"session"> | string
    expiresAt?: DateTimeFilter<"session"> | Date | string
    token?: StringFilter<"session"> | string
    createdAt?: DateTimeFilter<"session"> | Date | string
    updatedAt?: DateTimeFilter<"session"> | Date | string
    ipAddress?: StringNullableFilter<"session"> | string | null
    userAgent?: StringNullableFilter<"session"> | string | null
    userId?: StringFilter<"session"> | string
  }

  export type sessionOrderByWithRelationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    _relevance?: sessionOrderByRelevanceInput
  }

  export type sessionWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    token?: string
    AND?: sessionWhereInput | sessionWhereInput[]
    OR?: sessionWhereInput[]
    NOT?: sessionWhereInput | sessionWhereInput[]
    expiresAt?: DateTimeFilter<"session"> | Date | string
    createdAt?: DateTimeFilter<"session"> | Date | string
    updatedAt?: DateTimeFilter<"session"> | Date | string
    ipAddress?: StringNullableFilter<"session"> | string | null
    userAgent?: StringNullableFilter<"session"> | string | null
    userId?: StringFilter<"session"> | string
  }, "id" | "token">

  export type sessionOrderByWithAggregationInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrderInput | SortOrder
    userAgent?: SortOrderInput | SortOrder
    userId?: SortOrder
    _count?: sessionCountOrderByAggregateInput
    _max?: sessionMaxOrderByAggregateInput
    _min?: sessionMinOrderByAggregateInput
  }

  export type sessionScalarWhereWithAggregatesInput = {
    AND?: sessionScalarWhereWithAggregatesInput | sessionScalarWhereWithAggregatesInput[]
    OR?: sessionScalarWhereWithAggregatesInput[]
    NOT?: sessionScalarWhereWithAggregatesInput | sessionScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"session"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"session"> | Date | string
    token?: StringWithAggregatesFilter<"session"> | string
    createdAt?: DateTimeWithAggregatesFilter<"session"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"session"> | Date | string
    ipAddress?: StringNullableWithAggregatesFilter<"session"> | string | null
    userAgent?: StringNullableWithAggregatesFilter<"session"> | string | null
    userId?: StringWithAggregatesFilter<"session"> | string
  }

  export type sharesWhereInput = {
    AND?: sharesWhereInput | sharesWhereInput[]
    OR?: sharesWhereInput[]
    NOT?: sharesWhereInput | sharesWhereInput[]
    id?: StringFilter<"shares"> | string
    note_id?: StringFilter<"shares"> | string
    user_id?: StringFilter<"shares"> | string
    created_at?: DateTimeNullableFilter<"shares"> | Date | string | null
    expires_at?: DateTimeNullableFilter<"shares"> | Date | string | null
    permission?: Enumshares_permissionNullableFilter<"shares"> | $Enums.shares_permission | null
    notes?: XOR<NotesScalarRelationFilter, notesWhereInput>
    user?: XOR<UserScalarRelationFilter, userWhereInput>
  }

  export type sharesOrderByWithRelationInput = {
    id?: SortOrder
    note_id?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    permission?: SortOrderInput | SortOrder
    notes?: notesOrderByWithRelationInput
    user?: userOrderByWithRelationInput
    _relevance?: sharesOrderByRelevanceInput
  }

  export type sharesWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: sharesWhereInput | sharesWhereInput[]
    OR?: sharesWhereInput[]
    NOT?: sharesWhereInput | sharesWhereInput[]
    note_id?: StringFilter<"shares"> | string
    user_id?: StringFilter<"shares"> | string
    created_at?: DateTimeNullableFilter<"shares"> | Date | string | null
    expires_at?: DateTimeNullableFilter<"shares"> | Date | string | null
    permission?: Enumshares_permissionNullableFilter<"shares"> | $Enums.shares_permission | null
    notes?: XOR<NotesScalarRelationFilter, notesWhereInput>
    user?: XOR<UserScalarRelationFilter, userWhereInput>
  }, "id">

  export type sharesOrderByWithAggregationInput = {
    id?: SortOrder
    note_id?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrderInput | SortOrder
    expires_at?: SortOrderInput | SortOrder
    permission?: SortOrderInput | SortOrder
    _count?: sharesCountOrderByAggregateInput
    _max?: sharesMaxOrderByAggregateInput
    _min?: sharesMinOrderByAggregateInput
  }

  export type sharesScalarWhereWithAggregatesInput = {
    AND?: sharesScalarWhereWithAggregatesInput | sharesScalarWhereWithAggregatesInput[]
    OR?: sharesScalarWhereWithAggregatesInput[]
    NOT?: sharesScalarWhereWithAggregatesInput | sharesScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"shares"> | string
    note_id?: StringWithAggregatesFilter<"shares"> | string
    user_id?: StringWithAggregatesFilter<"shares"> | string
    created_at?: DateTimeNullableWithAggregatesFilter<"shares"> | Date | string | null
    expires_at?: DateTimeNullableWithAggregatesFilter<"shares"> | Date | string | null
    permission?: Enumshares_permissionNullableWithAggregatesFilter<"shares"> | $Enums.shares_permission | null
  }

  export type tagsWhereInput = {
    AND?: tagsWhereInput | tagsWhereInput[]
    OR?: tagsWhereInput[]
    NOT?: tagsWhereInput | tagsWhereInput[]
    id?: StringFilter<"tags"> | string
    name?: StringFilter<"tags"> | string
    user_id?: StringFilter<"tags"> | string
    created_at?: DateTimeNullableFilter<"tags"> | Date | string | null
    note_tags?: Note_tagsListRelationFilter
    user?: XOR<UserScalarRelationFilter, userWhereInput>
  }

  export type tagsOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrderInput | SortOrder
    note_tags?: note_tagsOrderByRelationAggregateInput
    user?: userOrderByWithRelationInput
    _relevance?: tagsOrderByRelevanceInput
  }

  export type tagsWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    user_id_name?: tagsUser_idNameCompoundUniqueInput
    AND?: tagsWhereInput | tagsWhereInput[]
    OR?: tagsWhereInput[]
    NOT?: tagsWhereInput | tagsWhereInput[]
    name?: StringFilter<"tags"> | string
    user_id?: StringFilter<"tags"> | string
    created_at?: DateTimeNullableFilter<"tags"> | Date | string | null
    note_tags?: Note_tagsListRelationFilter
    user?: XOR<UserScalarRelationFilter, userWhereInput>
  }, "id" | "user_id_name">

  export type tagsOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrderInput | SortOrder
    _count?: tagsCountOrderByAggregateInput
    _max?: tagsMaxOrderByAggregateInput
    _min?: tagsMinOrderByAggregateInput
  }

  export type tagsScalarWhereWithAggregatesInput = {
    AND?: tagsScalarWhereWithAggregatesInput | tagsScalarWhereWithAggregatesInput[]
    OR?: tagsScalarWhereWithAggregatesInput[]
    NOT?: tagsScalarWhereWithAggregatesInput | tagsScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"tags"> | string
    name?: StringWithAggregatesFilter<"tags"> | string
    user_id?: StringWithAggregatesFilter<"tags"> | string
    created_at?: DateTimeNullableWithAggregatesFilter<"tags"> | Date | string | null
  }

  export type userWhereInput = {
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    id?: StringFilter<"user"> | string
    name?: StringFilter<"user"> | string
    email?: StringFilter<"user"> | string
    emailVerified?: BoolFilter<"user"> | boolean
    image?: StringNullableFilter<"user"> | string | null
    createdAt?: DateTimeFilter<"user"> | Date | string
    updatedAt?: DateTimeFilter<"user"> | Date | string
    folders?: FoldersListRelationFilter
    notes?: NotesListRelationFilter
    shares?: SharesListRelationFilter
    tags?: TagsListRelationFilter
  }

  export type userOrderByWithRelationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    folders?: foldersOrderByRelationAggregateInput
    notes?: notesOrderByRelationAggregateInput
    shares?: sharesOrderByRelationAggregateInput
    tags?: tagsOrderByRelationAggregateInput
    _relevance?: userOrderByRelevanceInput
  }

  export type userWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: userWhereInput | userWhereInput[]
    OR?: userWhereInput[]
    NOT?: userWhereInput | userWhereInput[]
    name?: StringFilter<"user"> | string
    emailVerified?: BoolFilter<"user"> | boolean
    image?: StringNullableFilter<"user"> | string | null
    createdAt?: DateTimeFilter<"user"> | Date | string
    updatedAt?: DateTimeFilter<"user"> | Date | string
    folders?: FoldersListRelationFilter
    notes?: NotesListRelationFilter
    shares?: SharesListRelationFilter
    tags?: TagsListRelationFilter
  }, "id" | "email">

  export type userOrderByWithAggregationInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrderInput | SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: userCountOrderByAggregateInput
    _max?: userMaxOrderByAggregateInput
    _min?: userMinOrderByAggregateInput
  }

  export type userScalarWhereWithAggregatesInput = {
    AND?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    OR?: userScalarWhereWithAggregatesInput[]
    NOT?: userScalarWhereWithAggregatesInput | userScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"user"> | string
    name?: StringWithAggregatesFilter<"user"> | string
    email?: StringWithAggregatesFilter<"user"> | string
    emailVerified?: BoolWithAggregatesFilter<"user"> | boolean
    image?: StringNullableWithAggregatesFilter<"user"> | string | null
    createdAt?: DateTimeWithAggregatesFilter<"user"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"user"> | Date | string
  }

  export type verificationWhereInput = {
    AND?: verificationWhereInput | verificationWhereInput[]
    OR?: verificationWhereInput[]
    NOT?: verificationWhereInput | verificationWhereInput[]
    id?: StringFilter<"verification"> | string
    identifier?: StringFilter<"verification"> | string
    value?: StringFilter<"verification"> | string
    expiresAt?: DateTimeFilter<"verification"> | Date | string
    createdAt?: DateTimeNullableFilter<"verification"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"verification"> | Date | string | null
  }

  export type verificationOrderByWithRelationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _relevance?: verificationOrderByRelevanceInput
  }

  export type verificationWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: verificationWhereInput | verificationWhereInput[]
    OR?: verificationWhereInput[]
    NOT?: verificationWhereInput | verificationWhereInput[]
    identifier?: StringFilter<"verification"> | string
    value?: StringFilter<"verification"> | string
    expiresAt?: DateTimeFilter<"verification"> | Date | string
    createdAt?: DateTimeNullableFilter<"verification"> | Date | string | null
    updatedAt?: DateTimeNullableFilter<"verification"> | Date | string | null
  }, "id">

  export type verificationOrderByWithAggregationInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrderInput | SortOrder
    updatedAt?: SortOrderInput | SortOrder
    _count?: verificationCountOrderByAggregateInput
    _max?: verificationMaxOrderByAggregateInput
    _min?: verificationMinOrderByAggregateInput
  }

  export type verificationScalarWhereWithAggregatesInput = {
    AND?: verificationScalarWhereWithAggregatesInput | verificationScalarWhereWithAggregatesInput[]
    OR?: verificationScalarWhereWithAggregatesInput[]
    NOT?: verificationScalarWhereWithAggregatesInput | verificationScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"verification"> | string
    identifier?: StringWithAggregatesFilter<"verification"> | string
    value?: StringWithAggregatesFilter<"verification"> | string
    expiresAt?: DateTimeWithAggregatesFilter<"verification"> | Date | string
    createdAt?: DateTimeNullableWithAggregatesFilter<"verification"> | Date | string | null
    updatedAt?: DateTimeNullableWithAggregatesFilter<"verification"> | Date | string | null
  }

  export type accountCreateInput = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type accountUncheckedCreateInput = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type accountUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type accountUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type accountCreateManyInput = {
    id: string
    accountId: string
    providerId: string
    userId: string
    accessToken?: string | null
    refreshToken?: string | null
    idToken?: string | null
    accessTokenExpiresAt?: Date | string | null
    refreshTokenExpiresAt?: Date | string | null
    scope?: string | null
    password?: string | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type accountUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type accountUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    accountId?: StringFieldUpdateOperationsInput | string
    providerId?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    accessToken?: NullableStringFieldUpdateOperationsInput | string | null
    refreshToken?: NullableStringFieldUpdateOperationsInput | string | null
    idToken?: NullableStringFieldUpdateOperationsInput | string | null
    accessTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    refreshTokenExpiresAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    scope?: NullableStringFieldUpdateOperationsInput | string | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type auth_sessionsCreateInput = {
    id: string
    expires_at: Date | string
    created_at?: Date | string | null
    auth_users: auth_usersCreateNestedOneWithoutAuth_sessionsInput
  }

  export type auth_sessionsUncheckedCreateInput = {
    id: string
    user_id: string
    expires_at: Date | string
    created_at?: Date | string | null
  }

  export type auth_sessionsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auth_users?: auth_usersUpdateOneRequiredWithoutAuth_sessionsNestedInput
  }

  export type auth_sessionsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type auth_sessionsCreateManyInput = {
    id: string
    user_id: string
    expires_at: Date | string
    created_at?: Date | string | null
  }

  export type auth_sessionsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type auth_sessionsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type auth_usersCreateInput = {
    id: string
    email: string
    email_verified?: boolean | null
    password?: string | null
    name?: string | null
    image?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    auth_sessions?: auth_sessionsCreateNestedManyWithoutAuth_usersInput
  }

  export type auth_usersUncheckedCreateInput = {
    id: string
    email: string
    email_verified?: boolean | null
    password?: string | null
    name?: string | null
    image?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    auth_sessions?: auth_sessionsUncheckedCreateNestedManyWithoutAuth_usersInput
  }

  export type auth_usersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    email_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auth_sessions?: auth_sessionsUpdateManyWithoutAuth_usersNestedInput
  }

  export type auth_usersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    email_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    auth_sessions?: auth_sessionsUncheckedUpdateManyWithoutAuth_usersNestedInput
  }

  export type auth_usersCreateManyInput = {
    id: string
    email: string
    email_verified?: boolean | null
    password?: string | null
    name?: string | null
    image?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type auth_usersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    email_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type auth_usersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    email_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type auth_verification_tokensCreateInput = {
    identifier: string
    token: string
    expires_at: Date | string
  }

  export type auth_verification_tokensUncheckedCreateInput = {
    identifier: string
    token: string
    expires_at: Date | string
  }

  export type auth_verification_tokensUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type auth_verification_tokensUncheckedUpdateInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type auth_verification_tokensCreateManyInput = {
    identifier: string
    token: string
    expires_at: Date | string
  }

  export type auth_verification_tokensUpdateManyMutationInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type auth_verification_tokensUncheckedUpdateManyInput = {
    identifier?: StringFieldUpdateOperationsInput | string
    token?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type foldersCreateInput = {
    id: string
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    folders?: foldersCreateNestedOneWithoutOther_foldersInput
    other_folders?: foldersCreateNestedManyWithoutFoldersInput
    user: userCreateNestedOneWithoutFoldersInput
    notes?: notesCreateNestedManyWithoutFoldersInput
  }

  export type foldersUncheckedCreateInput = {
    id: string
    name: string
    user_id: string
    parent_id?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    other_folders?: foldersUncheckedCreateNestedManyWithoutFoldersInput
    notes?: notesUncheckedCreateNestedManyWithoutFoldersInput
  }

  export type foldersUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    folders?: foldersUpdateOneWithoutOther_foldersNestedInput
    other_folders?: foldersUpdateManyWithoutFoldersNestedInput
    user?: userUpdateOneRequiredWithoutFoldersNestedInput
    notes?: notesUpdateManyWithoutFoldersNestedInput
  }

  export type foldersUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    other_folders?: foldersUncheckedUpdateManyWithoutFoldersNestedInput
    notes?: notesUncheckedUpdateManyWithoutFoldersNestedInput
  }

  export type foldersCreateManyInput = {
    id: string
    name: string
    user_id: string
    parent_id?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type foldersUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type foldersUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type note_tagsCreateInput = {
    notes: notesCreateNestedOneWithoutNote_tagsInput
    tags: tagsCreateNestedOneWithoutNote_tagsInput
  }

  export type note_tagsUncheckedCreateInput = {
    note_id: string
    tag_id: string
  }

  export type note_tagsUpdateInput = {
    notes?: notesUpdateOneRequiredWithoutNote_tagsNestedInput
    tags?: tagsUpdateOneRequiredWithoutNote_tagsNestedInput
  }

  export type note_tagsUncheckedUpdateInput = {
    note_id?: StringFieldUpdateOperationsInput | string
    tag_id?: StringFieldUpdateOperationsInput | string
  }

  export type note_tagsCreateManyInput = {
    note_id: string
    tag_id: string
  }

  export type note_tagsUpdateManyMutationInput = {

  }

  export type note_tagsUncheckedUpdateManyInput = {
    note_id?: StringFieldUpdateOperationsInput | string
    tag_id?: StringFieldUpdateOperationsInput | string
  }

  export type notesCreateInput = {
    id: string
    name: string
    content?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    is_pinned?: boolean | null
    is_public?: boolean | null
    note_tags?: note_tagsCreateNestedManyWithoutNotesInput
    folders?: foldersCreateNestedOneWithoutNotesInput
    user: userCreateNestedOneWithoutNotesInput
    shares?: sharesCreateNestedManyWithoutNotesInput
  }

  export type notesUncheckedCreateInput = {
    id: string
    name: string
    content?: string | null
    user_id: string
    parent_id?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    is_pinned?: boolean | null
    is_public?: boolean | null
    note_tags?: note_tagsUncheckedCreateNestedManyWithoutNotesInput
    shares?: sharesUncheckedCreateNestedManyWithoutNotesInput
  }

  export type notesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_pinned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_public?: NullableBoolFieldUpdateOperationsInput | boolean | null
    note_tags?: note_tagsUpdateManyWithoutNotesNestedInput
    folders?: foldersUpdateOneWithoutNotesNestedInput
    user?: userUpdateOneRequiredWithoutNotesNestedInput
    shares?: sharesUpdateManyWithoutNotesNestedInput
  }

  export type notesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_pinned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_public?: NullableBoolFieldUpdateOperationsInput | boolean | null
    note_tags?: note_tagsUncheckedUpdateManyWithoutNotesNestedInput
    shares?: sharesUncheckedUpdateManyWithoutNotesNestedInput
  }

  export type notesCreateManyInput = {
    id: string
    name: string
    content?: string | null
    user_id: string
    parent_id?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    is_pinned?: boolean | null
    is_public?: boolean | null
  }

  export type notesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_pinned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_public?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type notesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_pinned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_public?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type pending_sharesCreateInput = {
    id: string
    note_id: string
    user_email: string
    permission?: $Enums.pending_shares_permission
  }

  export type pending_sharesUncheckedCreateInput = {
    id: string
    note_id: string
    user_email: string
    permission?: $Enums.pending_shares_permission
  }

  export type pending_sharesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    note_id?: StringFieldUpdateOperationsInput | string
    user_email?: StringFieldUpdateOperationsInput | string
    permission?: Enumpending_shares_permissionFieldUpdateOperationsInput | $Enums.pending_shares_permission
  }

  export type pending_sharesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    note_id?: StringFieldUpdateOperationsInput | string
    user_email?: StringFieldUpdateOperationsInput | string
    permission?: Enumpending_shares_permissionFieldUpdateOperationsInput | $Enums.pending_shares_permission
  }

  export type pending_sharesCreateManyInput = {
    id: string
    note_id: string
    user_email: string
    permission?: $Enums.pending_shares_permission
  }

  export type pending_sharesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    note_id?: StringFieldUpdateOperationsInput | string
    user_email?: StringFieldUpdateOperationsInput | string
    permission?: Enumpending_shares_permissionFieldUpdateOperationsInput | $Enums.pending_shares_permission
  }

  export type pending_sharesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    note_id?: StringFieldUpdateOperationsInput | string
    user_email?: StringFieldUpdateOperationsInput | string
    permission?: Enumpending_shares_permissionFieldUpdateOperationsInput | $Enums.pending_shares_permission
  }

  export type sessionCreateInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
  }

  export type sessionUncheckedCreateInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
  }

  export type sessionUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type sessionUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type sessionCreateManyInput = {
    id: string
    expiresAt: Date | string
    token: string
    createdAt: Date | string
    updatedAt: Date | string
    ipAddress?: string | null
    userAgent?: string | null
    userId: string
  }

  export type sessionUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type sessionUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    token?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    ipAddress?: NullableStringFieldUpdateOperationsInput | string | null
    userAgent?: NullableStringFieldUpdateOperationsInput | string | null
    userId?: StringFieldUpdateOperationsInput | string
  }

  export type sharesCreateInput = {
    id: string
    created_at?: Date | string | null
    expires_at?: Date | string | null
    permission?: $Enums.shares_permission | null
    notes: notesCreateNestedOneWithoutSharesInput
    user: userCreateNestedOneWithoutSharesInput
  }

  export type sharesUncheckedCreateInput = {
    id: string
    note_id: string
    user_id: string
    created_at?: Date | string | null
    expires_at?: Date | string | null
    permission?: $Enums.shares_permission | null
  }

  export type sharesUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    permission?: NullableEnumshares_permissionFieldUpdateOperationsInput | $Enums.shares_permission | null
    notes?: notesUpdateOneRequiredWithoutSharesNestedInput
    user?: userUpdateOneRequiredWithoutSharesNestedInput
  }

  export type sharesUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    note_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    permission?: NullableEnumshares_permissionFieldUpdateOperationsInput | $Enums.shares_permission | null
  }

  export type sharesCreateManyInput = {
    id: string
    note_id: string
    user_id: string
    created_at?: Date | string | null
    expires_at?: Date | string | null
    permission?: $Enums.shares_permission | null
  }

  export type sharesUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    permission?: NullableEnumshares_permissionFieldUpdateOperationsInput | $Enums.shares_permission | null
  }

  export type sharesUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    note_id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    permission?: NullableEnumshares_permissionFieldUpdateOperationsInput | $Enums.shares_permission | null
  }

  export type tagsCreateInput = {
    id: string
    name: string
    created_at?: Date | string | null
    note_tags?: note_tagsCreateNestedManyWithoutTagsInput
    user: userCreateNestedOneWithoutTagsInput
  }

  export type tagsUncheckedCreateInput = {
    id: string
    name: string
    user_id: string
    created_at?: Date | string | null
    note_tags?: note_tagsUncheckedCreateNestedManyWithoutTagsInput
  }

  export type tagsUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note_tags?: note_tagsUpdateManyWithoutTagsNestedInput
    user?: userUpdateOneRequiredWithoutTagsNestedInput
  }

  export type tagsUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note_tags?: note_tagsUncheckedUpdateManyWithoutTagsNestedInput
  }

  export type tagsCreateManyInput = {
    id: string
    name: string
    user_id: string
    created_at?: Date | string | null
  }

  export type tagsUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type tagsUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type userCreateInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    folders?: foldersCreateNestedManyWithoutUserInput
    notes?: notesCreateNestedManyWithoutUserInput
    shares?: sharesCreateNestedManyWithoutUserInput
    tags?: tagsCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    folders?: foldersUncheckedCreateNestedManyWithoutUserInput
    notes?: notesUncheckedCreateNestedManyWithoutUserInput
    shares?: sharesUncheckedCreateNestedManyWithoutUserInput
    tags?: tagsUncheckedCreateNestedManyWithoutUserInput
  }

  export type userUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    folders?: foldersUpdateManyWithoutUserNestedInput
    notes?: notesUpdateManyWithoutUserNestedInput
    shares?: sharesUpdateManyWithoutUserNestedInput
    tags?: tagsUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    folders?: foldersUncheckedUpdateManyWithoutUserNestedInput
    notes?: notesUncheckedUpdateManyWithoutUserNestedInput
    shares?: sharesUncheckedUpdateManyWithoutUserNestedInput
    tags?: tagsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type userCreateManyInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
  }

  export type userUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type userUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type verificationCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type verificationUncheckedCreateInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type verificationUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type verificationUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type verificationCreateManyInput = {
    id: string
    identifier: string
    value: string
    expiresAt: Date | string
    createdAt?: Date | string | null
    updatedAt?: Date | string | null
  }

  export type verificationUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type verificationUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    identifier?: StringFieldUpdateOperationsInput | string
    value?: StringFieldUpdateOperationsInput | string
    expiresAt?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updatedAt?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type accountOrderByRelevanceInput = {
    fields: accountOrderByRelevanceFieldEnum | accountOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type accountCountOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type accountMaxOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type accountMinOrderByAggregateInput = {
    id?: SortOrder
    accountId?: SortOrder
    providerId?: SortOrder
    userId?: SortOrder
    accessToken?: SortOrder
    refreshToken?: SortOrder
    idToken?: SortOrder
    accessTokenExpiresAt?: SortOrder
    refreshTokenExpiresAt?: SortOrder
    scope?: SortOrder
    password?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type Auth_usersScalarRelationFilter = {
    is?: auth_usersWhereInput
    isNot?: auth_usersWhereInput
  }

  export type auth_sessionsOrderByRelevanceInput = {
    fields: auth_sessionsOrderByRelevanceFieldEnum | auth_sessionsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type auth_sessionsCountOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
  }

  export type auth_sessionsMaxOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
  }

  export type auth_sessionsMinOrderByAggregateInput = {
    id?: SortOrder
    user_id?: SortOrder
    expires_at?: SortOrder
    created_at?: SortOrder
  }

  export type BoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type Auth_sessionsListRelationFilter = {
    every?: auth_sessionsWhereInput
    some?: auth_sessionsWhereInput
    none?: auth_sessionsWhereInput
  }

  export type auth_sessionsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type auth_usersOrderByRelevanceInput = {
    fields: auth_usersOrderByRelevanceFieldEnum | auth_usersOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type auth_usersCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    email_verified?: SortOrder
    password?: SortOrder
    name?: SortOrder
    image?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type auth_usersMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    email_verified?: SortOrder
    password?: SortOrder
    name?: SortOrder
    image?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type auth_usersMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    email_verified?: SortOrder
    password?: SortOrder
    name?: SortOrder
    image?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type BoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type auth_verification_tokensOrderByRelevanceInput = {
    fields: auth_verification_tokensOrderByRelevanceFieldEnum | auth_verification_tokensOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type auth_verification_tokensIdentifierTokenCompoundUniqueInput = {
    identifier: string
    token: string
  }

  export type auth_verification_tokensCountOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
  }

  export type auth_verification_tokensMaxOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
  }

  export type auth_verification_tokensMinOrderByAggregateInput = {
    identifier?: SortOrder
    token?: SortOrder
    expires_at?: SortOrder
  }

  export type FoldersNullableScalarRelationFilter = {
    is?: foldersWhereInput | null
    isNot?: foldersWhereInput | null
  }

  export type FoldersListRelationFilter = {
    every?: foldersWhereInput
    some?: foldersWhereInput
    none?: foldersWhereInput
  }

  export type UserScalarRelationFilter = {
    is?: userWhereInput
    isNot?: userWhereInput
  }

  export type NotesListRelationFilter = {
    every?: notesWhereInput
    some?: notesWhereInput
    none?: notesWhereInput
  }

  export type foldersOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type notesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type foldersOrderByRelevanceInput = {
    fields: foldersOrderByRelevanceFieldEnum | foldersOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type foldersCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    user_id?: SortOrder
    parent_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type foldersMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    user_id?: SortOrder
    parent_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type foldersMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    user_id?: SortOrder
    parent_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
  }

  export type NotesScalarRelationFilter = {
    is?: notesWhereInput
    isNot?: notesWhereInput
  }

  export type TagsScalarRelationFilter = {
    is?: tagsWhereInput
    isNot?: tagsWhereInput
  }

  export type note_tagsOrderByRelevanceInput = {
    fields: note_tagsOrderByRelevanceFieldEnum | note_tagsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type note_tagsNote_idTag_idCompoundUniqueInput = {
    note_id: string
    tag_id: string
  }

  export type note_tagsCountOrderByAggregateInput = {
    note_id?: SortOrder
    tag_id?: SortOrder
  }

  export type note_tagsMaxOrderByAggregateInput = {
    note_id?: SortOrder
    tag_id?: SortOrder
  }

  export type note_tagsMinOrderByAggregateInput = {
    note_id?: SortOrder
    tag_id?: SortOrder
  }

  export type Note_tagsListRelationFilter = {
    every?: note_tagsWhereInput
    some?: note_tagsWhereInput
    none?: note_tagsWhereInput
  }

  export type SharesListRelationFilter = {
    every?: sharesWhereInput
    some?: sharesWhereInput
    none?: sharesWhereInput
  }

  export type note_tagsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type sharesOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type notesOrderByRelevanceInput = {
    fields: notesOrderByRelevanceFieldEnum | notesOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type notesCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    content?: SortOrder
    user_id?: SortOrder
    parent_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_pinned?: SortOrder
    is_public?: SortOrder
  }

  export type notesMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    content?: SortOrder
    user_id?: SortOrder
    parent_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_pinned?: SortOrder
    is_public?: SortOrder
  }

  export type notesMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    content?: SortOrder
    user_id?: SortOrder
    parent_id?: SortOrder
    created_at?: SortOrder
    updated_at?: SortOrder
    is_pinned?: SortOrder
    is_public?: SortOrder
  }

  export type Enumpending_shares_permissionFilter<$PrismaModel = never> = {
    equals?: $Enums.pending_shares_permission | Enumpending_shares_permissionFieldRefInput<$PrismaModel>
    in?: $Enums.pending_shares_permission[]
    notIn?: $Enums.pending_shares_permission[]
    not?: NestedEnumpending_shares_permissionFilter<$PrismaModel> | $Enums.pending_shares_permission
  }

  export type pending_sharesOrderByRelevanceInput = {
    fields: pending_sharesOrderByRelevanceFieldEnum | pending_sharesOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type pending_sharesCountOrderByAggregateInput = {
    id?: SortOrder
    note_id?: SortOrder
    user_email?: SortOrder
    permission?: SortOrder
  }

  export type pending_sharesMaxOrderByAggregateInput = {
    id?: SortOrder
    note_id?: SortOrder
    user_email?: SortOrder
    permission?: SortOrder
  }

  export type pending_sharesMinOrderByAggregateInput = {
    id?: SortOrder
    note_id?: SortOrder
    user_email?: SortOrder
    permission?: SortOrder
  }

  export type Enumpending_shares_permissionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.pending_shares_permission | Enumpending_shares_permissionFieldRefInput<$PrismaModel>
    in?: $Enums.pending_shares_permission[]
    notIn?: $Enums.pending_shares_permission[]
    not?: NestedEnumpending_shares_permissionWithAggregatesFilter<$PrismaModel> | $Enums.pending_shares_permission
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumpending_shares_permissionFilter<$PrismaModel>
    _max?: NestedEnumpending_shares_permissionFilter<$PrismaModel>
  }

  export type sessionOrderByRelevanceInput = {
    fields: sessionOrderByRelevanceFieldEnum | sessionOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type sessionCountOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type sessionMaxOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type sessionMinOrderByAggregateInput = {
    id?: SortOrder
    expiresAt?: SortOrder
    token?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    ipAddress?: SortOrder
    userAgent?: SortOrder
    userId?: SortOrder
  }

  export type Enumshares_permissionNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.shares_permission | Enumshares_permissionFieldRefInput<$PrismaModel> | null
    in?: $Enums.shares_permission[] | null
    notIn?: $Enums.shares_permission[] | null
    not?: NestedEnumshares_permissionNullableFilter<$PrismaModel> | $Enums.shares_permission | null
  }

  export type sharesOrderByRelevanceInput = {
    fields: sharesOrderByRelevanceFieldEnum | sharesOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type sharesCountOrderByAggregateInput = {
    id?: SortOrder
    note_id?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    expires_at?: SortOrder
    permission?: SortOrder
  }

  export type sharesMaxOrderByAggregateInput = {
    id?: SortOrder
    note_id?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    expires_at?: SortOrder
    permission?: SortOrder
  }

  export type sharesMinOrderByAggregateInput = {
    id?: SortOrder
    note_id?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
    expires_at?: SortOrder
    permission?: SortOrder
  }

  export type Enumshares_permissionNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.shares_permission | Enumshares_permissionFieldRefInput<$PrismaModel> | null
    in?: $Enums.shares_permission[] | null
    notIn?: $Enums.shares_permission[] | null
    not?: NestedEnumshares_permissionNullableWithAggregatesFilter<$PrismaModel> | $Enums.shares_permission | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumshares_permissionNullableFilter<$PrismaModel>
    _max?: NestedEnumshares_permissionNullableFilter<$PrismaModel>
  }

  export type tagsOrderByRelevanceInput = {
    fields: tagsOrderByRelevanceFieldEnum | tagsOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type tagsUser_idNameCompoundUniqueInput = {
    user_id: string
    name: string
  }

  export type tagsCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
  }

  export type tagsMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
  }

  export type tagsMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    user_id?: SortOrder
    created_at?: SortOrder
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type TagsListRelationFilter = {
    every?: tagsWhereInput
    some?: tagsWhereInput
    none?: tagsWhereInput
  }

  export type tagsOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type userOrderByRelevanceInput = {
    fields: userOrderByRelevanceFieldEnum | userOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type userCountOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type userMaxOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type userMinOrderByAggregateInput = {
    id?: SortOrder
    name?: SortOrder
    email?: SortOrder
    emailVerified?: SortOrder
    image?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type verificationOrderByRelevanceInput = {
    fields: verificationOrderByRelevanceFieldEnum | verificationOrderByRelevanceFieldEnum[]
    sort: SortOrder
    search: string
  }

  export type verificationCountOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type verificationMaxOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type verificationMinOrderByAggregateInput = {
    id?: SortOrder
    identifier?: SortOrder
    value?: SortOrder
    expiresAt?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type auth_usersCreateNestedOneWithoutAuth_sessionsInput = {
    create?: XOR<auth_usersCreateWithoutAuth_sessionsInput, auth_usersUncheckedCreateWithoutAuth_sessionsInput>
    connectOrCreate?: auth_usersCreateOrConnectWithoutAuth_sessionsInput
    connect?: auth_usersWhereUniqueInput
  }

  export type auth_usersUpdateOneRequiredWithoutAuth_sessionsNestedInput = {
    create?: XOR<auth_usersCreateWithoutAuth_sessionsInput, auth_usersUncheckedCreateWithoutAuth_sessionsInput>
    connectOrCreate?: auth_usersCreateOrConnectWithoutAuth_sessionsInput
    upsert?: auth_usersUpsertWithoutAuth_sessionsInput
    connect?: auth_usersWhereUniqueInput
    update?: XOR<XOR<auth_usersUpdateToOneWithWhereWithoutAuth_sessionsInput, auth_usersUpdateWithoutAuth_sessionsInput>, auth_usersUncheckedUpdateWithoutAuth_sessionsInput>
  }

  export type auth_sessionsCreateNestedManyWithoutAuth_usersInput = {
    create?: XOR<auth_sessionsCreateWithoutAuth_usersInput, auth_sessionsUncheckedCreateWithoutAuth_usersInput> | auth_sessionsCreateWithoutAuth_usersInput[] | auth_sessionsUncheckedCreateWithoutAuth_usersInput[]
    connectOrCreate?: auth_sessionsCreateOrConnectWithoutAuth_usersInput | auth_sessionsCreateOrConnectWithoutAuth_usersInput[]
    createMany?: auth_sessionsCreateManyAuth_usersInputEnvelope
    connect?: auth_sessionsWhereUniqueInput | auth_sessionsWhereUniqueInput[]
  }

  export type auth_sessionsUncheckedCreateNestedManyWithoutAuth_usersInput = {
    create?: XOR<auth_sessionsCreateWithoutAuth_usersInput, auth_sessionsUncheckedCreateWithoutAuth_usersInput> | auth_sessionsCreateWithoutAuth_usersInput[] | auth_sessionsUncheckedCreateWithoutAuth_usersInput[]
    connectOrCreate?: auth_sessionsCreateOrConnectWithoutAuth_usersInput | auth_sessionsCreateOrConnectWithoutAuth_usersInput[]
    createMany?: auth_sessionsCreateManyAuth_usersInputEnvelope
    connect?: auth_sessionsWhereUniqueInput | auth_sessionsWhereUniqueInput[]
  }

  export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null
  }

  export type auth_sessionsUpdateManyWithoutAuth_usersNestedInput = {
    create?: XOR<auth_sessionsCreateWithoutAuth_usersInput, auth_sessionsUncheckedCreateWithoutAuth_usersInput> | auth_sessionsCreateWithoutAuth_usersInput[] | auth_sessionsUncheckedCreateWithoutAuth_usersInput[]
    connectOrCreate?: auth_sessionsCreateOrConnectWithoutAuth_usersInput | auth_sessionsCreateOrConnectWithoutAuth_usersInput[]
    upsert?: auth_sessionsUpsertWithWhereUniqueWithoutAuth_usersInput | auth_sessionsUpsertWithWhereUniqueWithoutAuth_usersInput[]
    createMany?: auth_sessionsCreateManyAuth_usersInputEnvelope
    set?: auth_sessionsWhereUniqueInput | auth_sessionsWhereUniqueInput[]
    disconnect?: auth_sessionsWhereUniqueInput | auth_sessionsWhereUniqueInput[]
    delete?: auth_sessionsWhereUniqueInput | auth_sessionsWhereUniqueInput[]
    connect?: auth_sessionsWhereUniqueInput | auth_sessionsWhereUniqueInput[]
    update?: auth_sessionsUpdateWithWhereUniqueWithoutAuth_usersInput | auth_sessionsUpdateWithWhereUniqueWithoutAuth_usersInput[]
    updateMany?: auth_sessionsUpdateManyWithWhereWithoutAuth_usersInput | auth_sessionsUpdateManyWithWhereWithoutAuth_usersInput[]
    deleteMany?: auth_sessionsScalarWhereInput | auth_sessionsScalarWhereInput[]
  }

  export type auth_sessionsUncheckedUpdateManyWithoutAuth_usersNestedInput = {
    create?: XOR<auth_sessionsCreateWithoutAuth_usersInput, auth_sessionsUncheckedCreateWithoutAuth_usersInput> | auth_sessionsCreateWithoutAuth_usersInput[] | auth_sessionsUncheckedCreateWithoutAuth_usersInput[]
    connectOrCreate?: auth_sessionsCreateOrConnectWithoutAuth_usersInput | auth_sessionsCreateOrConnectWithoutAuth_usersInput[]
    upsert?: auth_sessionsUpsertWithWhereUniqueWithoutAuth_usersInput | auth_sessionsUpsertWithWhereUniqueWithoutAuth_usersInput[]
    createMany?: auth_sessionsCreateManyAuth_usersInputEnvelope
    set?: auth_sessionsWhereUniqueInput | auth_sessionsWhereUniqueInput[]
    disconnect?: auth_sessionsWhereUniqueInput | auth_sessionsWhereUniqueInput[]
    delete?: auth_sessionsWhereUniqueInput | auth_sessionsWhereUniqueInput[]
    connect?: auth_sessionsWhereUniqueInput | auth_sessionsWhereUniqueInput[]
    update?: auth_sessionsUpdateWithWhereUniqueWithoutAuth_usersInput | auth_sessionsUpdateWithWhereUniqueWithoutAuth_usersInput[]
    updateMany?: auth_sessionsUpdateManyWithWhereWithoutAuth_usersInput | auth_sessionsUpdateManyWithWhereWithoutAuth_usersInput[]
    deleteMany?: auth_sessionsScalarWhereInput | auth_sessionsScalarWhereInput[]
  }

  export type foldersCreateNestedOneWithoutOther_foldersInput = {
    create?: XOR<foldersCreateWithoutOther_foldersInput, foldersUncheckedCreateWithoutOther_foldersInput>
    connectOrCreate?: foldersCreateOrConnectWithoutOther_foldersInput
    connect?: foldersWhereUniqueInput
  }

  export type foldersCreateNestedManyWithoutFoldersInput = {
    create?: XOR<foldersCreateWithoutFoldersInput, foldersUncheckedCreateWithoutFoldersInput> | foldersCreateWithoutFoldersInput[] | foldersUncheckedCreateWithoutFoldersInput[]
    connectOrCreate?: foldersCreateOrConnectWithoutFoldersInput | foldersCreateOrConnectWithoutFoldersInput[]
    createMany?: foldersCreateManyFoldersInputEnvelope
    connect?: foldersWhereUniqueInput | foldersWhereUniqueInput[]
  }

  export type userCreateNestedOneWithoutFoldersInput = {
    create?: XOR<userCreateWithoutFoldersInput, userUncheckedCreateWithoutFoldersInput>
    connectOrCreate?: userCreateOrConnectWithoutFoldersInput
    connect?: userWhereUniqueInput
  }

  export type notesCreateNestedManyWithoutFoldersInput = {
    create?: XOR<notesCreateWithoutFoldersInput, notesUncheckedCreateWithoutFoldersInput> | notesCreateWithoutFoldersInput[] | notesUncheckedCreateWithoutFoldersInput[]
    connectOrCreate?: notesCreateOrConnectWithoutFoldersInput | notesCreateOrConnectWithoutFoldersInput[]
    createMany?: notesCreateManyFoldersInputEnvelope
    connect?: notesWhereUniqueInput | notesWhereUniqueInput[]
  }

  export type foldersUncheckedCreateNestedManyWithoutFoldersInput = {
    create?: XOR<foldersCreateWithoutFoldersInput, foldersUncheckedCreateWithoutFoldersInput> | foldersCreateWithoutFoldersInput[] | foldersUncheckedCreateWithoutFoldersInput[]
    connectOrCreate?: foldersCreateOrConnectWithoutFoldersInput | foldersCreateOrConnectWithoutFoldersInput[]
    createMany?: foldersCreateManyFoldersInputEnvelope
    connect?: foldersWhereUniqueInput | foldersWhereUniqueInput[]
  }

  export type notesUncheckedCreateNestedManyWithoutFoldersInput = {
    create?: XOR<notesCreateWithoutFoldersInput, notesUncheckedCreateWithoutFoldersInput> | notesCreateWithoutFoldersInput[] | notesUncheckedCreateWithoutFoldersInput[]
    connectOrCreate?: notesCreateOrConnectWithoutFoldersInput | notesCreateOrConnectWithoutFoldersInput[]
    createMany?: notesCreateManyFoldersInputEnvelope
    connect?: notesWhereUniqueInput | notesWhereUniqueInput[]
  }

  export type foldersUpdateOneWithoutOther_foldersNestedInput = {
    create?: XOR<foldersCreateWithoutOther_foldersInput, foldersUncheckedCreateWithoutOther_foldersInput>
    connectOrCreate?: foldersCreateOrConnectWithoutOther_foldersInput
    upsert?: foldersUpsertWithoutOther_foldersInput
    disconnect?: foldersWhereInput | boolean
    delete?: foldersWhereInput | boolean
    connect?: foldersWhereUniqueInput
    update?: XOR<XOR<foldersUpdateToOneWithWhereWithoutOther_foldersInput, foldersUpdateWithoutOther_foldersInput>, foldersUncheckedUpdateWithoutOther_foldersInput>
  }

  export type foldersUpdateManyWithoutFoldersNestedInput = {
    create?: XOR<foldersCreateWithoutFoldersInput, foldersUncheckedCreateWithoutFoldersInput> | foldersCreateWithoutFoldersInput[] | foldersUncheckedCreateWithoutFoldersInput[]
    connectOrCreate?: foldersCreateOrConnectWithoutFoldersInput | foldersCreateOrConnectWithoutFoldersInput[]
    upsert?: foldersUpsertWithWhereUniqueWithoutFoldersInput | foldersUpsertWithWhereUniqueWithoutFoldersInput[]
    createMany?: foldersCreateManyFoldersInputEnvelope
    set?: foldersWhereUniqueInput | foldersWhereUniqueInput[]
    disconnect?: foldersWhereUniqueInput | foldersWhereUniqueInput[]
    delete?: foldersWhereUniqueInput | foldersWhereUniqueInput[]
    connect?: foldersWhereUniqueInput | foldersWhereUniqueInput[]
    update?: foldersUpdateWithWhereUniqueWithoutFoldersInput | foldersUpdateWithWhereUniqueWithoutFoldersInput[]
    updateMany?: foldersUpdateManyWithWhereWithoutFoldersInput | foldersUpdateManyWithWhereWithoutFoldersInput[]
    deleteMany?: foldersScalarWhereInput | foldersScalarWhereInput[]
  }

  export type userUpdateOneRequiredWithoutFoldersNestedInput = {
    create?: XOR<userCreateWithoutFoldersInput, userUncheckedCreateWithoutFoldersInput>
    connectOrCreate?: userCreateOrConnectWithoutFoldersInput
    upsert?: userUpsertWithoutFoldersInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutFoldersInput, userUpdateWithoutFoldersInput>, userUncheckedUpdateWithoutFoldersInput>
  }

  export type notesUpdateManyWithoutFoldersNestedInput = {
    create?: XOR<notesCreateWithoutFoldersInput, notesUncheckedCreateWithoutFoldersInput> | notesCreateWithoutFoldersInput[] | notesUncheckedCreateWithoutFoldersInput[]
    connectOrCreate?: notesCreateOrConnectWithoutFoldersInput | notesCreateOrConnectWithoutFoldersInput[]
    upsert?: notesUpsertWithWhereUniqueWithoutFoldersInput | notesUpsertWithWhereUniqueWithoutFoldersInput[]
    createMany?: notesCreateManyFoldersInputEnvelope
    set?: notesWhereUniqueInput | notesWhereUniqueInput[]
    disconnect?: notesWhereUniqueInput | notesWhereUniqueInput[]
    delete?: notesWhereUniqueInput | notesWhereUniqueInput[]
    connect?: notesWhereUniqueInput | notesWhereUniqueInput[]
    update?: notesUpdateWithWhereUniqueWithoutFoldersInput | notesUpdateWithWhereUniqueWithoutFoldersInput[]
    updateMany?: notesUpdateManyWithWhereWithoutFoldersInput | notesUpdateManyWithWhereWithoutFoldersInput[]
    deleteMany?: notesScalarWhereInput | notesScalarWhereInput[]
  }

  export type foldersUncheckedUpdateManyWithoutFoldersNestedInput = {
    create?: XOR<foldersCreateWithoutFoldersInput, foldersUncheckedCreateWithoutFoldersInput> | foldersCreateWithoutFoldersInput[] | foldersUncheckedCreateWithoutFoldersInput[]
    connectOrCreate?: foldersCreateOrConnectWithoutFoldersInput | foldersCreateOrConnectWithoutFoldersInput[]
    upsert?: foldersUpsertWithWhereUniqueWithoutFoldersInput | foldersUpsertWithWhereUniqueWithoutFoldersInput[]
    createMany?: foldersCreateManyFoldersInputEnvelope
    set?: foldersWhereUniqueInput | foldersWhereUniqueInput[]
    disconnect?: foldersWhereUniqueInput | foldersWhereUniqueInput[]
    delete?: foldersWhereUniqueInput | foldersWhereUniqueInput[]
    connect?: foldersWhereUniqueInput | foldersWhereUniqueInput[]
    update?: foldersUpdateWithWhereUniqueWithoutFoldersInput | foldersUpdateWithWhereUniqueWithoutFoldersInput[]
    updateMany?: foldersUpdateManyWithWhereWithoutFoldersInput | foldersUpdateManyWithWhereWithoutFoldersInput[]
    deleteMany?: foldersScalarWhereInput | foldersScalarWhereInput[]
  }

  export type notesUncheckedUpdateManyWithoutFoldersNestedInput = {
    create?: XOR<notesCreateWithoutFoldersInput, notesUncheckedCreateWithoutFoldersInput> | notesCreateWithoutFoldersInput[] | notesUncheckedCreateWithoutFoldersInput[]
    connectOrCreate?: notesCreateOrConnectWithoutFoldersInput | notesCreateOrConnectWithoutFoldersInput[]
    upsert?: notesUpsertWithWhereUniqueWithoutFoldersInput | notesUpsertWithWhereUniqueWithoutFoldersInput[]
    createMany?: notesCreateManyFoldersInputEnvelope
    set?: notesWhereUniqueInput | notesWhereUniqueInput[]
    disconnect?: notesWhereUniqueInput | notesWhereUniqueInput[]
    delete?: notesWhereUniqueInput | notesWhereUniqueInput[]
    connect?: notesWhereUniqueInput | notesWhereUniqueInput[]
    update?: notesUpdateWithWhereUniqueWithoutFoldersInput | notesUpdateWithWhereUniqueWithoutFoldersInput[]
    updateMany?: notesUpdateManyWithWhereWithoutFoldersInput | notesUpdateManyWithWhereWithoutFoldersInput[]
    deleteMany?: notesScalarWhereInput | notesScalarWhereInput[]
  }

  export type notesCreateNestedOneWithoutNote_tagsInput = {
    create?: XOR<notesCreateWithoutNote_tagsInput, notesUncheckedCreateWithoutNote_tagsInput>
    connectOrCreate?: notesCreateOrConnectWithoutNote_tagsInput
    connect?: notesWhereUniqueInput
  }

  export type tagsCreateNestedOneWithoutNote_tagsInput = {
    create?: XOR<tagsCreateWithoutNote_tagsInput, tagsUncheckedCreateWithoutNote_tagsInput>
    connectOrCreate?: tagsCreateOrConnectWithoutNote_tagsInput
    connect?: tagsWhereUniqueInput
  }

  export type notesUpdateOneRequiredWithoutNote_tagsNestedInput = {
    create?: XOR<notesCreateWithoutNote_tagsInput, notesUncheckedCreateWithoutNote_tagsInput>
    connectOrCreate?: notesCreateOrConnectWithoutNote_tagsInput
    upsert?: notesUpsertWithoutNote_tagsInput
    connect?: notesWhereUniqueInput
    update?: XOR<XOR<notesUpdateToOneWithWhereWithoutNote_tagsInput, notesUpdateWithoutNote_tagsInput>, notesUncheckedUpdateWithoutNote_tagsInput>
  }

  export type tagsUpdateOneRequiredWithoutNote_tagsNestedInput = {
    create?: XOR<tagsCreateWithoutNote_tagsInput, tagsUncheckedCreateWithoutNote_tagsInput>
    connectOrCreate?: tagsCreateOrConnectWithoutNote_tagsInput
    upsert?: tagsUpsertWithoutNote_tagsInput
    connect?: tagsWhereUniqueInput
    update?: XOR<XOR<tagsUpdateToOneWithWhereWithoutNote_tagsInput, tagsUpdateWithoutNote_tagsInput>, tagsUncheckedUpdateWithoutNote_tagsInput>
  }

  export type note_tagsCreateNestedManyWithoutNotesInput = {
    create?: XOR<note_tagsCreateWithoutNotesInput, note_tagsUncheckedCreateWithoutNotesInput> | note_tagsCreateWithoutNotesInput[] | note_tagsUncheckedCreateWithoutNotesInput[]
    connectOrCreate?: note_tagsCreateOrConnectWithoutNotesInput | note_tagsCreateOrConnectWithoutNotesInput[]
    createMany?: note_tagsCreateManyNotesInputEnvelope
    connect?: note_tagsWhereUniqueInput | note_tagsWhereUniqueInput[]
  }

  export type foldersCreateNestedOneWithoutNotesInput = {
    create?: XOR<foldersCreateWithoutNotesInput, foldersUncheckedCreateWithoutNotesInput>
    connectOrCreate?: foldersCreateOrConnectWithoutNotesInput
    connect?: foldersWhereUniqueInput
  }

  export type userCreateNestedOneWithoutNotesInput = {
    create?: XOR<userCreateWithoutNotesInput, userUncheckedCreateWithoutNotesInput>
    connectOrCreate?: userCreateOrConnectWithoutNotesInput
    connect?: userWhereUniqueInput
  }

  export type sharesCreateNestedManyWithoutNotesInput = {
    create?: XOR<sharesCreateWithoutNotesInput, sharesUncheckedCreateWithoutNotesInput> | sharesCreateWithoutNotesInput[] | sharesUncheckedCreateWithoutNotesInput[]
    connectOrCreate?: sharesCreateOrConnectWithoutNotesInput | sharesCreateOrConnectWithoutNotesInput[]
    createMany?: sharesCreateManyNotesInputEnvelope
    connect?: sharesWhereUniqueInput | sharesWhereUniqueInput[]
  }

  export type note_tagsUncheckedCreateNestedManyWithoutNotesInput = {
    create?: XOR<note_tagsCreateWithoutNotesInput, note_tagsUncheckedCreateWithoutNotesInput> | note_tagsCreateWithoutNotesInput[] | note_tagsUncheckedCreateWithoutNotesInput[]
    connectOrCreate?: note_tagsCreateOrConnectWithoutNotesInput | note_tagsCreateOrConnectWithoutNotesInput[]
    createMany?: note_tagsCreateManyNotesInputEnvelope
    connect?: note_tagsWhereUniqueInput | note_tagsWhereUniqueInput[]
  }

  export type sharesUncheckedCreateNestedManyWithoutNotesInput = {
    create?: XOR<sharesCreateWithoutNotesInput, sharesUncheckedCreateWithoutNotesInput> | sharesCreateWithoutNotesInput[] | sharesUncheckedCreateWithoutNotesInput[]
    connectOrCreate?: sharesCreateOrConnectWithoutNotesInput | sharesCreateOrConnectWithoutNotesInput[]
    createMany?: sharesCreateManyNotesInputEnvelope
    connect?: sharesWhereUniqueInput | sharesWhereUniqueInput[]
  }

  export type note_tagsUpdateManyWithoutNotesNestedInput = {
    create?: XOR<note_tagsCreateWithoutNotesInput, note_tagsUncheckedCreateWithoutNotesInput> | note_tagsCreateWithoutNotesInput[] | note_tagsUncheckedCreateWithoutNotesInput[]
    connectOrCreate?: note_tagsCreateOrConnectWithoutNotesInput | note_tagsCreateOrConnectWithoutNotesInput[]
    upsert?: note_tagsUpsertWithWhereUniqueWithoutNotesInput | note_tagsUpsertWithWhereUniqueWithoutNotesInput[]
    createMany?: note_tagsCreateManyNotesInputEnvelope
    set?: note_tagsWhereUniqueInput | note_tagsWhereUniqueInput[]
    disconnect?: note_tagsWhereUniqueInput | note_tagsWhereUniqueInput[]
    delete?: note_tagsWhereUniqueInput | note_tagsWhereUniqueInput[]
    connect?: note_tagsWhereUniqueInput | note_tagsWhereUniqueInput[]
    update?: note_tagsUpdateWithWhereUniqueWithoutNotesInput | note_tagsUpdateWithWhereUniqueWithoutNotesInput[]
    updateMany?: note_tagsUpdateManyWithWhereWithoutNotesInput | note_tagsUpdateManyWithWhereWithoutNotesInput[]
    deleteMany?: note_tagsScalarWhereInput | note_tagsScalarWhereInput[]
  }

  export type foldersUpdateOneWithoutNotesNestedInput = {
    create?: XOR<foldersCreateWithoutNotesInput, foldersUncheckedCreateWithoutNotesInput>
    connectOrCreate?: foldersCreateOrConnectWithoutNotesInput
    upsert?: foldersUpsertWithoutNotesInput
    disconnect?: foldersWhereInput | boolean
    delete?: foldersWhereInput | boolean
    connect?: foldersWhereUniqueInput
    update?: XOR<XOR<foldersUpdateToOneWithWhereWithoutNotesInput, foldersUpdateWithoutNotesInput>, foldersUncheckedUpdateWithoutNotesInput>
  }

  export type userUpdateOneRequiredWithoutNotesNestedInput = {
    create?: XOR<userCreateWithoutNotesInput, userUncheckedCreateWithoutNotesInput>
    connectOrCreate?: userCreateOrConnectWithoutNotesInput
    upsert?: userUpsertWithoutNotesInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutNotesInput, userUpdateWithoutNotesInput>, userUncheckedUpdateWithoutNotesInput>
  }

  export type sharesUpdateManyWithoutNotesNestedInput = {
    create?: XOR<sharesCreateWithoutNotesInput, sharesUncheckedCreateWithoutNotesInput> | sharesCreateWithoutNotesInput[] | sharesUncheckedCreateWithoutNotesInput[]
    connectOrCreate?: sharesCreateOrConnectWithoutNotesInput | sharesCreateOrConnectWithoutNotesInput[]
    upsert?: sharesUpsertWithWhereUniqueWithoutNotesInput | sharesUpsertWithWhereUniqueWithoutNotesInput[]
    createMany?: sharesCreateManyNotesInputEnvelope
    set?: sharesWhereUniqueInput | sharesWhereUniqueInput[]
    disconnect?: sharesWhereUniqueInput | sharesWhereUniqueInput[]
    delete?: sharesWhereUniqueInput | sharesWhereUniqueInput[]
    connect?: sharesWhereUniqueInput | sharesWhereUniqueInput[]
    update?: sharesUpdateWithWhereUniqueWithoutNotesInput | sharesUpdateWithWhereUniqueWithoutNotesInput[]
    updateMany?: sharesUpdateManyWithWhereWithoutNotesInput | sharesUpdateManyWithWhereWithoutNotesInput[]
    deleteMany?: sharesScalarWhereInput | sharesScalarWhereInput[]
  }

  export type note_tagsUncheckedUpdateManyWithoutNotesNestedInput = {
    create?: XOR<note_tagsCreateWithoutNotesInput, note_tagsUncheckedCreateWithoutNotesInput> | note_tagsCreateWithoutNotesInput[] | note_tagsUncheckedCreateWithoutNotesInput[]
    connectOrCreate?: note_tagsCreateOrConnectWithoutNotesInput | note_tagsCreateOrConnectWithoutNotesInput[]
    upsert?: note_tagsUpsertWithWhereUniqueWithoutNotesInput | note_tagsUpsertWithWhereUniqueWithoutNotesInput[]
    createMany?: note_tagsCreateManyNotesInputEnvelope
    set?: note_tagsWhereUniqueInput | note_tagsWhereUniqueInput[]
    disconnect?: note_tagsWhereUniqueInput | note_tagsWhereUniqueInput[]
    delete?: note_tagsWhereUniqueInput | note_tagsWhereUniqueInput[]
    connect?: note_tagsWhereUniqueInput | note_tagsWhereUniqueInput[]
    update?: note_tagsUpdateWithWhereUniqueWithoutNotesInput | note_tagsUpdateWithWhereUniqueWithoutNotesInput[]
    updateMany?: note_tagsUpdateManyWithWhereWithoutNotesInput | note_tagsUpdateManyWithWhereWithoutNotesInput[]
    deleteMany?: note_tagsScalarWhereInput | note_tagsScalarWhereInput[]
  }

  export type sharesUncheckedUpdateManyWithoutNotesNestedInput = {
    create?: XOR<sharesCreateWithoutNotesInput, sharesUncheckedCreateWithoutNotesInput> | sharesCreateWithoutNotesInput[] | sharesUncheckedCreateWithoutNotesInput[]
    connectOrCreate?: sharesCreateOrConnectWithoutNotesInput | sharesCreateOrConnectWithoutNotesInput[]
    upsert?: sharesUpsertWithWhereUniqueWithoutNotesInput | sharesUpsertWithWhereUniqueWithoutNotesInput[]
    createMany?: sharesCreateManyNotesInputEnvelope
    set?: sharesWhereUniqueInput | sharesWhereUniqueInput[]
    disconnect?: sharesWhereUniqueInput | sharesWhereUniqueInput[]
    delete?: sharesWhereUniqueInput | sharesWhereUniqueInput[]
    connect?: sharesWhereUniqueInput | sharesWhereUniqueInput[]
    update?: sharesUpdateWithWhereUniqueWithoutNotesInput | sharesUpdateWithWhereUniqueWithoutNotesInput[]
    updateMany?: sharesUpdateManyWithWhereWithoutNotesInput | sharesUpdateManyWithWhereWithoutNotesInput[]
    deleteMany?: sharesScalarWhereInput | sharesScalarWhereInput[]
  }

  export type Enumpending_shares_permissionFieldUpdateOperationsInput = {
    set?: $Enums.pending_shares_permission
  }

  export type notesCreateNestedOneWithoutSharesInput = {
    create?: XOR<notesCreateWithoutSharesInput, notesUncheckedCreateWithoutSharesInput>
    connectOrCreate?: notesCreateOrConnectWithoutSharesInput
    connect?: notesWhereUniqueInput
  }

  export type userCreateNestedOneWithoutSharesInput = {
    create?: XOR<userCreateWithoutSharesInput, userUncheckedCreateWithoutSharesInput>
    connectOrCreate?: userCreateOrConnectWithoutSharesInput
    connect?: userWhereUniqueInput
  }

  export type NullableEnumshares_permissionFieldUpdateOperationsInput = {
    set?: $Enums.shares_permission | null
  }

  export type notesUpdateOneRequiredWithoutSharesNestedInput = {
    create?: XOR<notesCreateWithoutSharesInput, notesUncheckedCreateWithoutSharesInput>
    connectOrCreate?: notesCreateOrConnectWithoutSharesInput
    upsert?: notesUpsertWithoutSharesInput
    connect?: notesWhereUniqueInput
    update?: XOR<XOR<notesUpdateToOneWithWhereWithoutSharesInput, notesUpdateWithoutSharesInput>, notesUncheckedUpdateWithoutSharesInput>
  }

  export type userUpdateOneRequiredWithoutSharesNestedInput = {
    create?: XOR<userCreateWithoutSharesInput, userUncheckedCreateWithoutSharesInput>
    connectOrCreate?: userCreateOrConnectWithoutSharesInput
    upsert?: userUpsertWithoutSharesInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutSharesInput, userUpdateWithoutSharesInput>, userUncheckedUpdateWithoutSharesInput>
  }

  export type note_tagsCreateNestedManyWithoutTagsInput = {
    create?: XOR<note_tagsCreateWithoutTagsInput, note_tagsUncheckedCreateWithoutTagsInput> | note_tagsCreateWithoutTagsInput[] | note_tagsUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: note_tagsCreateOrConnectWithoutTagsInput | note_tagsCreateOrConnectWithoutTagsInput[]
    createMany?: note_tagsCreateManyTagsInputEnvelope
    connect?: note_tagsWhereUniqueInput | note_tagsWhereUniqueInput[]
  }

  export type userCreateNestedOneWithoutTagsInput = {
    create?: XOR<userCreateWithoutTagsInput, userUncheckedCreateWithoutTagsInput>
    connectOrCreate?: userCreateOrConnectWithoutTagsInput
    connect?: userWhereUniqueInput
  }

  export type note_tagsUncheckedCreateNestedManyWithoutTagsInput = {
    create?: XOR<note_tagsCreateWithoutTagsInput, note_tagsUncheckedCreateWithoutTagsInput> | note_tagsCreateWithoutTagsInput[] | note_tagsUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: note_tagsCreateOrConnectWithoutTagsInput | note_tagsCreateOrConnectWithoutTagsInput[]
    createMany?: note_tagsCreateManyTagsInputEnvelope
    connect?: note_tagsWhereUniqueInput | note_tagsWhereUniqueInput[]
  }

  export type note_tagsUpdateManyWithoutTagsNestedInput = {
    create?: XOR<note_tagsCreateWithoutTagsInput, note_tagsUncheckedCreateWithoutTagsInput> | note_tagsCreateWithoutTagsInput[] | note_tagsUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: note_tagsCreateOrConnectWithoutTagsInput | note_tagsCreateOrConnectWithoutTagsInput[]
    upsert?: note_tagsUpsertWithWhereUniqueWithoutTagsInput | note_tagsUpsertWithWhereUniqueWithoutTagsInput[]
    createMany?: note_tagsCreateManyTagsInputEnvelope
    set?: note_tagsWhereUniqueInput | note_tagsWhereUniqueInput[]
    disconnect?: note_tagsWhereUniqueInput | note_tagsWhereUniqueInput[]
    delete?: note_tagsWhereUniqueInput | note_tagsWhereUniqueInput[]
    connect?: note_tagsWhereUniqueInput | note_tagsWhereUniqueInput[]
    update?: note_tagsUpdateWithWhereUniqueWithoutTagsInput | note_tagsUpdateWithWhereUniqueWithoutTagsInput[]
    updateMany?: note_tagsUpdateManyWithWhereWithoutTagsInput | note_tagsUpdateManyWithWhereWithoutTagsInput[]
    deleteMany?: note_tagsScalarWhereInput | note_tagsScalarWhereInput[]
  }

  export type userUpdateOneRequiredWithoutTagsNestedInput = {
    create?: XOR<userCreateWithoutTagsInput, userUncheckedCreateWithoutTagsInput>
    connectOrCreate?: userCreateOrConnectWithoutTagsInput
    upsert?: userUpsertWithoutTagsInput
    connect?: userWhereUniqueInput
    update?: XOR<XOR<userUpdateToOneWithWhereWithoutTagsInput, userUpdateWithoutTagsInput>, userUncheckedUpdateWithoutTagsInput>
  }

  export type note_tagsUncheckedUpdateManyWithoutTagsNestedInput = {
    create?: XOR<note_tagsCreateWithoutTagsInput, note_tagsUncheckedCreateWithoutTagsInput> | note_tagsCreateWithoutTagsInput[] | note_tagsUncheckedCreateWithoutTagsInput[]
    connectOrCreate?: note_tagsCreateOrConnectWithoutTagsInput | note_tagsCreateOrConnectWithoutTagsInput[]
    upsert?: note_tagsUpsertWithWhereUniqueWithoutTagsInput | note_tagsUpsertWithWhereUniqueWithoutTagsInput[]
    createMany?: note_tagsCreateManyTagsInputEnvelope
    set?: note_tagsWhereUniqueInput | note_tagsWhereUniqueInput[]
    disconnect?: note_tagsWhereUniqueInput | note_tagsWhereUniqueInput[]
    delete?: note_tagsWhereUniqueInput | note_tagsWhereUniqueInput[]
    connect?: note_tagsWhereUniqueInput | note_tagsWhereUniqueInput[]
    update?: note_tagsUpdateWithWhereUniqueWithoutTagsInput | note_tagsUpdateWithWhereUniqueWithoutTagsInput[]
    updateMany?: note_tagsUpdateManyWithWhereWithoutTagsInput | note_tagsUpdateManyWithWhereWithoutTagsInput[]
    deleteMany?: note_tagsScalarWhereInput | note_tagsScalarWhereInput[]
  }

  export type foldersCreateNestedManyWithoutUserInput = {
    create?: XOR<foldersCreateWithoutUserInput, foldersUncheckedCreateWithoutUserInput> | foldersCreateWithoutUserInput[] | foldersUncheckedCreateWithoutUserInput[]
    connectOrCreate?: foldersCreateOrConnectWithoutUserInput | foldersCreateOrConnectWithoutUserInput[]
    createMany?: foldersCreateManyUserInputEnvelope
    connect?: foldersWhereUniqueInput | foldersWhereUniqueInput[]
  }

  export type notesCreateNestedManyWithoutUserInput = {
    create?: XOR<notesCreateWithoutUserInput, notesUncheckedCreateWithoutUserInput> | notesCreateWithoutUserInput[] | notesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: notesCreateOrConnectWithoutUserInput | notesCreateOrConnectWithoutUserInput[]
    createMany?: notesCreateManyUserInputEnvelope
    connect?: notesWhereUniqueInput | notesWhereUniqueInput[]
  }

  export type sharesCreateNestedManyWithoutUserInput = {
    create?: XOR<sharesCreateWithoutUserInput, sharesUncheckedCreateWithoutUserInput> | sharesCreateWithoutUserInput[] | sharesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: sharesCreateOrConnectWithoutUserInput | sharesCreateOrConnectWithoutUserInput[]
    createMany?: sharesCreateManyUserInputEnvelope
    connect?: sharesWhereUniqueInput | sharesWhereUniqueInput[]
  }

  export type tagsCreateNestedManyWithoutUserInput = {
    create?: XOR<tagsCreateWithoutUserInput, tagsUncheckedCreateWithoutUserInput> | tagsCreateWithoutUserInput[] | tagsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: tagsCreateOrConnectWithoutUserInput | tagsCreateOrConnectWithoutUserInput[]
    createMany?: tagsCreateManyUserInputEnvelope
    connect?: tagsWhereUniqueInput | tagsWhereUniqueInput[]
  }

  export type foldersUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<foldersCreateWithoutUserInput, foldersUncheckedCreateWithoutUserInput> | foldersCreateWithoutUserInput[] | foldersUncheckedCreateWithoutUserInput[]
    connectOrCreate?: foldersCreateOrConnectWithoutUserInput | foldersCreateOrConnectWithoutUserInput[]
    createMany?: foldersCreateManyUserInputEnvelope
    connect?: foldersWhereUniqueInput | foldersWhereUniqueInput[]
  }

  export type notesUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<notesCreateWithoutUserInput, notesUncheckedCreateWithoutUserInput> | notesCreateWithoutUserInput[] | notesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: notesCreateOrConnectWithoutUserInput | notesCreateOrConnectWithoutUserInput[]
    createMany?: notesCreateManyUserInputEnvelope
    connect?: notesWhereUniqueInput | notesWhereUniqueInput[]
  }

  export type sharesUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<sharesCreateWithoutUserInput, sharesUncheckedCreateWithoutUserInput> | sharesCreateWithoutUserInput[] | sharesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: sharesCreateOrConnectWithoutUserInput | sharesCreateOrConnectWithoutUserInput[]
    createMany?: sharesCreateManyUserInputEnvelope
    connect?: sharesWhereUniqueInput | sharesWhereUniqueInput[]
  }

  export type tagsUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<tagsCreateWithoutUserInput, tagsUncheckedCreateWithoutUserInput> | tagsCreateWithoutUserInput[] | tagsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: tagsCreateOrConnectWithoutUserInput | tagsCreateOrConnectWithoutUserInput[]
    createMany?: tagsCreateManyUserInputEnvelope
    connect?: tagsWhereUniqueInput | tagsWhereUniqueInput[]
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type foldersUpdateManyWithoutUserNestedInput = {
    create?: XOR<foldersCreateWithoutUserInput, foldersUncheckedCreateWithoutUserInput> | foldersCreateWithoutUserInput[] | foldersUncheckedCreateWithoutUserInput[]
    connectOrCreate?: foldersCreateOrConnectWithoutUserInput | foldersCreateOrConnectWithoutUserInput[]
    upsert?: foldersUpsertWithWhereUniqueWithoutUserInput | foldersUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: foldersCreateManyUserInputEnvelope
    set?: foldersWhereUniqueInput | foldersWhereUniqueInput[]
    disconnect?: foldersWhereUniqueInput | foldersWhereUniqueInput[]
    delete?: foldersWhereUniqueInput | foldersWhereUniqueInput[]
    connect?: foldersWhereUniqueInput | foldersWhereUniqueInput[]
    update?: foldersUpdateWithWhereUniqueWithoutUserInput | foldersUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: foldersUpdateManyWithWhereWithoutUserInput | foldersUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: foldersScalarWhereInput | foldersScalarWhereInput[]
  }

  export type notesUpdateManyWithoutUserNestedInput = {
    create?: XOR<notesCreateWithoutUserInput, notesUncheckedCreateWithoutUserInput> | notesCreateWithoutUserInput[] | notesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: notesCreateOrConnectWithoutUserInput | notesCreateOrConnectWithoutUserInput[]
    upsert?: notesUpsertWithWhereUniqueWithoutUserInput | notesUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: notesCreateManyUserInputEnvelope
    set?: notesWhereUniqueInput | notesWhereUniqueInput[]
    disconnect?: notesWhereUniqueInput | notesWhereUniqueInput[]
    delete?: notesWhereUniqueInput | notesWhereUniqueInput[]
    connect?: notesWhereUniqueInput | notesWhereUniqueInput[]
    update?: notesUpdateWithWhereUniqueWithoutUserInput | notesUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: notesUpdateManyWithWhereWithoutUserInput | notesUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: notesScalarWhereInput | notesScalarWhereInput[]
  }

  export type sharesUpdateManyWithoutUserNestedInput = {
    create?: XOR<sharesCreateWithoutUserInput, sharesUncheckedCreateWithoutUserInput> | sharesCreateWithoutUserInput[] | sharesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: sharesCreateOrConnectWithoutUserInput | sharesCreateOrConnectWithoutUserInput[]
    upsert?: sharesUpsertWithWhereUniqueWithoutUserInput | sharesUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: sharesCreateManyUserInputEnvelope
    set?: sharesWhereUniqueInput | sharesWhereUniqueInput[]
    disconnect?: sharesWhereUniqueInput | sharesWhereUniqueInput[]
    delete?: sharesWhereUniqueInput | sharesWhereUniqueInput[]
    connect?: sharesWhereUniqueInput | sharesWhereUniqueInput[]
    update?: sharesUpdateWithWhereUniqueWithoutUserInput | sharesUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: sharesUpdateManyWithWhereWithoutUserInput | sharesUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: sharesScalarWhereInput | sharesScalarWhereInput[]
  }

  export type tagsUpdateManyWithoutUserNestedInput = {
    create?: XOR<tagsCreateWithoutUserInput, tagsUncheckedCreateWithoutUserInput> | tagsCreateWithoutUserInput[] | tagsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: tagsCreateOrConnectWithoutUserInput | tagsCreateOrConnectWithoutUserInput[]
    upsert?: tagsUpsertWithWhereUniqueWithoutUserInput | tagsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: tagsCreateManyUserInputEnvelope
    set?: tagsWhereUniqueInput | tagsWhereUniqueInput[]
    disconnect?: tagsWhereUniqueInput | tagsWhereUniqueInput[]
    delete?: tagsWhereUniqueInput | tagsWhereUniqueInput[]
    connect?: tagsWhereUniqueInput | tagsWhereUniqueInput[]
    update?: tagsUpdateWithWhereUniqueWithoutUserInput | tagsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: tagsUpdateManyWithWhereWithoutUserInput | tagsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: tagsScalarWhereInput | tagsScalarWhereInput[]
  }

  export type foldersUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<foldersCreateWithoutUserInput, foldersUncheckedCreateWithoutUserInput> | foldersCreateWithoutUserInput[] | foldersUncheckedCreateWithoutUserInput[]
    connectOrCreate?: foldersCreateOrConnectWithoutUserInput | foldersCreateOrConnectWithoutUserInput[]
    upsert?: foldersUpsertWithWhereUniqueWithoutUserInput | foldersUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: foldersCreateManyUserInputEnvelope
    set?: foldersWhereUniqueInput | foldersWhereUniqueInput[]
    disconnect?: foldersWhereUniqueInput | foldersWhereUniqueInput[]
    delete?: foldersWhereUniqueInput | foldersWhereUniqueInput[]
    connect?: foldersWhereUniqueInput | foldersWhereUniqueInput[]
    update?: foldersUpdateWithWhereUniqueWithoutUserInput | foldersUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: foldersUpdateManyWithWhereWithoutUserInput | foldersUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: foldersScalarWhereInput | foldersScalarWhereInput[]
  }

  export type notesUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<notesCreateWithoutUserInput, notesUncheckedCreateWithoutUserInput> | notesCreateWithoutUserInput[] | notesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: notesCreateOrConnectWithoutUserInput | notesCreateOrConnectWithoutUserInput[]
    upsert?: notesUpsertWithWhereUniqueWithoutUserInput | notesUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: notesCreateManyUserInputEnvelope
    set?: notesWhereUniqueInput | notesWhereUniqueInput[]
    disconnect?: notesWhereUniqueInput | notesWhereUniqueInput[]
    delete?: notesWhereUniqueInput | notesWhereUniqueInput[]
    connect?: notesWhereUniqueInput | notesWhereUniqueInput[]
    update?: notesUpdateWithWhereUniqueWithoutUserInput | notesUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: notesUpdateManyWithWhereWithoutUserInput | notesUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: notesScalarWhereInput | notesScalarWhereInput[]
  }

  export type sharesUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<sharesCreateWithoutUserInput, sharesUncheckedCreateWithoutUserInput> | sharesCreateWithoutUserInput[] | sharesUncheckedCreateWithoutUserInput[]
    connectOrCreate?: sharesCreateOrConnectWithoutUserInput | sharesCreateOrConnectWithoutUserInput[]
    upsert?: sharesUpsertWithWhereUniqueWithoutUserInput | sharesUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: sharesCreateManyUserInputEnvelope
    set?: sharesWhereUniqueInput | sharesWhereUniqueInput[]
    disconnect?: sharesWhereUniqueInput | sharesWhereUniqueInput[]
    delete?: sharesWhereUniqueInput | sharesWhereUniqueInput[]
    connect?: sharesWhereUniqueInput | sharesWhereUniqueInput[]
    update?: sharesUpdateWithWhereUniqueWithoutUserInput | sharesUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: sharesUpdateManyWithWhereWithoutUserInput | sharesUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: sharesScalarWhereInput | sharesScalarWhereInput[]
  }

  export type tagsUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<tagsCreateWithoutUserInput, tagsUncheckedCreateWithoutUserInput> | tagsCreateWithoutUserInput[] | tagsUncheckedCreateWithoutUserInput[]
    connectOrCreate?: tagsCreateOrConnectWithoutUserInput | tagsCreateOrConnectWithoutUserInput[]
    upsert?: tagsUpsertWithWhereUniqueWithoutUserInput | tagsUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: tagsCreateManyUserInputEnvelope
    set?: tagsWhereUniqueInput | tagsWhereUniqueInput[]
    disconnect?: tagsWhereUniqueInput | tagsWhereUniqueInput[]
    delete?: tagsWhereUniqueInput | tagsWhereUniqueInput[]
    connect?: tagsWhereUniqueInput | tagsWhereUniqueInput[]
    update?: tagsUpdateWithWhereUniqueWithoutUserInput | tagsUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: tagsUpdateManyWithWhereWithoutUserInput | tagsUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: tagsScalarWhereInput | tagsScalarWhereInput[]
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[]
    notIn?: string[]
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[]
    notIn?: number[]
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | null
    notIn?: string[] | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    search?: string
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | null
    notIn?: number[] | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | null
    notIn?: Date[] | string[] | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[]
    notIn?: Date[] | string[]
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolNullableFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableFilter<$PrismaModel> | boolean | null
  }

  export type NestedBoolNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel> | null
    not?: NestedBoolNullableWithAggregatesFilter<$PrismaModel> | boolean | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedBoolNullableFilter<$PrismaModel>
    _max?: NestedBoolNullableFilter<$PrismaModel>
  }

  export type NestedEnumpending_shares_permissionFilter<$PrismaModel = never> = {
    equals?: $Enums.pending_shares_permission | Enumpending_shares_permissionFieldRefInput<$PrismaModel>
    in?: $Enums.pending_shares_permission[]
    notIn?: $Enums.pending_shares_permission[]
    not?: NestedEnumpending_shares_permissionFilter<$PrismaModel> | $Enums.pending_shares_permission
  }

  export type NestedEnumpending_shares_permissionWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.pending_shares_permission | Enumpending_shares_permissionFieldRefInput<$PrismaModel>
    in?: $Enums.pending_shares_permission[]
    notIn?: $Enums.pending_shares_permission[]
    not?: NestedEnumpending_shares_permissionWithAggregatesFilter<$PrismaModel> | $Enums.pending_shares_permission
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumpending_shares_permissionFilter<$PrismaModel>
    _max?: NestedEnumpending_shares_permissionFilter<$PrismaModel>
  }

  export type NestedEnumshares_permissionNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.shares_permission | Enumshares_permissionFieldRefInput<$PrismaModel> | null
    in?: $Enums.shares_permission[] | null
    notIn?: $Enums.shares_permission[] | null
    not?: NestedEnumshares_permissionNullableFilter<$PrismaModel> | $Enums.shares_permission | null
  }

  export type NestedEnumshares_permissionNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.shares_permission | Enumshares_permissionFieldRefInput<$PrismaModel> | null
    in?: $Enums.shares_permission[] | null
    notIn?: $Enums.shares_permission[] | null
    not?: NestedEnumshares_permissionNullableWithAggregatesFilter<$PrismaModel> | $Enums.shares_permission | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedEnumshares_permissionNullableFilter<$PrismaModel>
    _max?: NestedEnumshares_permissionNullableFilter<$PrismaModel>
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type auth_usersCreateWithoutAuth_sessionsInput = {
    id: string
    email: string
    email_verified?: boolean | null
    password?: string | null
    name?: string | null
    image?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type auth_usersUncheckedCreateWithoutAuth_sessionsInput = {
    id: string
    email: string
    email_verified?: boolean | null
    password?: string | null
    name?: string | null
    image?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type auth_usersCreateOrConnectWithoutAuth_sessionsInput = {
    where: auth_usersWhereUniqueInput
    create: XOR<auth_usersCreateWithoutAuth_sessionsInput, auth_usersUncheckedCreateWithoutAuth_sessionsInput>
  }

  export type auth_usersUpsertWithoutAuth_sessionsInput = {
    update: XOR<auth_usersUpdateWithoutAuth_sessionsInput, auth_usersUncheckedUpdateWithoutAuth_sessionsInput>
    create: XOR<auth_usersCreateWithoutAuth_sessionsInput, auth_usersUncheckedCreateWithoutAuth_sessionsInput>
    where?: auth_usersWhereInput
  }

  export type auth_usersUpdateToOneWithWhereWithoutAuth_sessionsInput = {
    where?: auth_usersWhereInput
    data: XOR<auth_usersUpdateWithoutAuth_sessionsInput, auth_usersUncheckedUpdateWithoutAuth_sessionsInput>
  }

  export type auth_usersUpdateWithoutAuth_sessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    email_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type auth_usersUncheckedUpdateWithoutAuth_sessionsInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    email_verified?: NullableBoolFieldUpdateOperationsInput | boolean | null
    password?: NullableStringFieldUpdateOperationsInput | string | null
    name?: NullableStringFieldUpdateOperationsInput | string | null
    image?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type auth_sessionsCreateWithoutAuth_usersInput = {
    id: string
    expires_at: Date | string
    created_at?: Date | string | null
  }

  export type auth_sessionsUncheckedCreateWithoutAuth_usersInput = {
    id: string
    expires_at: Date | string
    created_at?: Date | string | null
  }

  export type auth_sessionsCreateOrConnectWithoutAuth_usersInput = {
    where: auth_sessionsWhereUniqueInput
    create: XOR<auth_sessionsCreateWithoutAuth_usersInput, auth_sessionsUncheckedCreateWithoutAuth_usersInput>
  }

  export type auth_sessionsCreateManyAuth_usersInputEnvelope = {
    data: auth_sessionsCreateManyAuth_usersInput | auth_sessionsCreateManyAuth_usersInput[]
    skipDuplicates?: boolean
  }

  export type auth_sessionsUpsertWithWhereUniqueWithoutAuth_usersInput = {
    where: auth_sessionsWhereUniqueInput
    update: XOR<auth_sessionsUpdateWithoutAuth_usersInput, auth_sessionsUncheckedUpdateWithoutAuth_usersInput>
    create: XOR<auth_sessionsCreateWithoutAuth_usersInput, auth_sessionsUncheckedCreateWithoutAuth_usersInput>
  }

  export type auth_sessionsUpdateWithWhereUniqueWithoutAuth_usersInput = {
    where: auth_sessionsWhereUniqueInput
    data: XOR<auth_sessionsUpdateWithoutAuth_usersInput, auth_sessionsUncheckedUpdateWithoutAuth_usersInput>
  }

  export type auth_sessionsUpdateManyWithWhereWithoutAuth_usersInput = {
    where: auth_sessionsScalarWhereInput
    data: XOR<auth_sessionsUpdateManyMutationInput, auth_sessionsUncheckedUpdateManyWithoutAuth_usersInput>
  }

  export type auth_sessionsScalarWhereInput = {
    AND?: auth_sessionsScalarWhereInput | auth_sessionsScalarWhereInput[]
    OR?: auth_sessionsScalarWhereInput[]
    NOT?: auth_sessionsScalarWhereInput | auth_sessionsScalarWhereInput[]
    id?: StringFilter<"auth_sessions"> | string
    user_id?: StringFilter<"auth_sessions"> | string
    expires_at?: DateTimeFilter<"auth_sessions"> | Date | string
    created_at?: DateTimeNullableFilter<"auth_sessions"> | Date | string | null
  }

  export type foldersCreateWithoutOther_foldersInput = {
    id: string
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    folders?: foldersCreateNestedOneWithoutOther_foldersInput
    user: userCreateNestedOneWithoutFoldersInput
    notes?: notesCreateNestedManyWithoutFoldersInput
  }

  export type foldersUncheckedCreateWithoutOther_foldersInput = {
    id: string
    name: string
    user_id: string
    parent_id?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    notes?: notesUncheckedCreateNestedManyWithoutFoldersInput
  }

  export type foldersCreateOrConnectWithoutOther_foldersInput = {
    where: foldersWhereUniqueInput
    create: XOR<foldersCreateWithoutOther_foldersInput, foldersUncheckedCreateWithoutOther_foldersInput>
  }

  export type foldersCreateWithoutFoldersInput = {
    id: string
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    other_folders?: foldersCreateNestedManyWithoutFoldersInput
    user: userCreateNestedOneWithoutFoldersInput
    notes?: notesCreateNestedManyWithoutFoldersInput
  }

  export type foldersUncheckedCreateWithoutFoldersInput = {
    id: string
    name: string
    user_id: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    other_folders?: foldersUncheckedCreateNestedManyWithoutFoldersInput
    notes?: notesUncheckedCreateNestedManyWithoutFoldersInput
  }

  export type foldersCreateOrConnectWithoutFoldersInput = {
    where: foldersWhereUniqueInput
    create: XOR<foldersCreateWithoutFoldersInput, foldersUncheckedCreateWithoutFoldersInput>
  }

  export type foldersCreateManyFoldersInputEnvelope = {
    data: foldersCreateManyFoldersInput | foldersCreateManyFoldersInput[]
    skipDuplicates?: boolean
  }

  export type userCreateWithoutFoldersInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    notes?: notesCreateNestedManyWithoutUserInput
    shares?: sharesCreateNestedManyWithoutUserInput
    tags?: tagsCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutFoldersInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    notes?: notesUncheckedCreateNestedManyWithoutUserInput
    shares?: sharesUncheckedCreateNestedManyWithoutUserInput
    tags?: tagsUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutFoldersInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutFoldersInput, userUncheckedCreateWithoutFoldersInput>
  }

  export type notesCreateWithoutFoldersInput = {
    id: string
    name: string
    content?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    is_pinned?: boolean | null
    is_public?: boolean | null
    note_tags?: note_tagsCreateNestedManyWithoutNotesInput
    user: userCreateNestedOneWithoutNotesInput
    shares?: sharesCreateNestedManyWithoutNotesInput
  }

  export type notesUncheckedCreateWithoutFoldersInput = {
    id: string
    name: string
    content?: string | null
    user_id: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    is_pinned?: boolean | null
    is_public?: boolean | null
    note_tags?: note_tagsUncheckedCreateNestedManyWithoutNotesInput
    shares?: sharesUncheckedCreateNestedManyWithoutNotesInput
  }

  export type notesCreateOrConnectWithoutFoldersInput = {
    where: notesWhereUniqueInput
    create: XOR<notesCreateWithoutFoldersInput, notesUncheckedCreateWithoutFoldersInput>
  }

  export type notesCreateManyFoldersInputEnvelope = {
    data: notesCreateManyFoldersInput | notesCreateManyFoldersInput[]
    skipDuplicates?: boolean
  }

  export type foldersUpsertWithoutOther_foldersInput = {
    update: XOR<foldersUpdateWithoutOther_foldersInput, foldersUncheckedUpdateWithoutOther_foldersInput>
    create: XOR<foldersCreateWithoutOther_foldersInput, foldersUncheckedCreateWithoutOther_foldersInput>
    where?: foldersWhereInput
  }

  export type foldersUpdateToOneWithWhereWithoutOther_foldersInput = {
    where?: foldersWhereInput
    data: XOR<foldersUpdateWithoutOther_foldersInput, foldersUncheckedUpdateWithoutOther_foldersInput>
  }

  export type foldersUpdateWithoutOther_foldersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    folders?: foldersUpdateOneWithoutOther_foldersNestedInput
    user?: userUpdateOneRequiredWithoutFoldersNestedInput
    notes?: notesUpdateManyWithoutFoldersNestedInput
  }

  export type foldersUncheckedUpdateWithoutOther_foldersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    notes?: notesUncheckedUpdateManyWithoutFoldersNestedInput
  }

  export type foldersUpsertWithWhereUniqueWithoutFoldersInput = {
    where: foldersWhereUniqueInput
    update: XOR<foldersUpdateWithoutFoldersInput, foldersUncheckedUpdateWithoutFoldersInput>
    create: XOR<foldersCreateWithoutFoldersInput, foldersUncheckedCreateWithoutFoldersInput>
  }

  export type foldersUpdateWithWhereUniqueWithoutFoldersInput = {
    where: foldersWhereUniqueInput
    data: XOR<foldersUpdateWithoutFoldersInput, foldersUncheckedUpdateWithoutFoldersInput>
  }

  export type foldersUpdateManyWithWhereWithoutFoldersInput = {
    where: foldersScalarWhereInput
    data: XOR<foldersUpdateManyMutationInput, foldersUncheckedUpdateManyWithoutFoldersInput>
  }

  export type foldersScalarWhereInput = {
    AND?: foldersScalarWhereInput | foldersScalarWhereInput[]
    OR?: foldersScalarWhereInput[]
    NOT?: foldersScalarWhereInput | foldersScalarWhereInput[]
    id?: StringFilter<"folders"> | string
    name?: StringFilter<"folders"> | string
    user_id?: StringFilter<"folders"> | string
    parent_id?: StringNullableFilter<"folders"> | string | null
    created_at?: DateTimeNullableFilter<"folders"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"folders"> | Date | string | null
  }

  export type userUpsertWithoutFoldersInput = {
    update: XOR<userUpdateWithoutFoldersInput, userUncheckedUpdateWithoutFoldersInput>
    create: XOR<userCreateWithoutFoldersInput, userUncheckedCreateWithoutFoldersInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutFoldersInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutFoldersInput, userUncheckedUpdateWithoutFoldersInput>
  }

  export type userUpdateWithoutFoldersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: notesUpdateManyWithoutUserNestedInput
    shares?: sharesUpdateManyWithoutUserNestedInput
    tags?: tagsUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutFoldersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    notes?: notesUncheckedUpdateManyWithoutUserNestedInput
    shares?: sharesUncheckedUpdateManyWithoutUserNestedInput
    tags?: tagsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type notesUpsertWithWhereUniqueWithoutFoldersInput = {
    where: notesWhereUniqueInput
    update: XOR<notesUpdateWithoutFoldersInput, notesUncheckedUpdateWithoutFoldersInput>
    create: XOR<notesCreateWithoutFoldersInput, notesUncheckedCreateWithoutFoldersInput>
  }

  export type notesUpdateWithWhereUniqueWithoutFoldersInput = {
    where: notesWhereUniqueInput
    data: XOR<notesUpdateWithoutFoldersInput, notesUncheckedUpdateWithoutFoldersInput>
  }

  export type notesUpdateManyWithWhereWithoutFoldersInput = {
    where: notesScalarWhereInput
    data: XOR<notesUpdateManyMutationInput, notesUncheckedUpdateManyWithoutFoldersInput>
  }

  export type notesScalarWhereInput = {
    AND?: notesScalarWhereInput | notesScalarWhereInput[]
    OR?: notesScalarWhereInput[]
    NOT?: notesScalarWhereInput | notesScalarWhereInput[]
    id?: StringFilter<"notes"> | string
    name?: StringFilter<"notes"> | string
    content?: StringNullableFilter<"notes"> | string | null
    user_id?: StringFilter<"notes"> | string
    parent_id?: StringNullableFilter<"notes"> | string | null
    created_at?: DateTimeNullableFilter<"notes"> | Date | string | null
    updated_at?: DateTimeNullableFilter<"notes"> | Date | string | null
    is_pinned?: BoolNullableFilter<"notes"> | boolean | null
    is_public?: BoolNullableFilter<"notes"> | boolean | null
  }

  export type notesCreateWithoutNote_tagsInput = {
    id: string
    name: string
    content?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    is_pinned?: boolean | null
    is_public?: boolean | null
    folders?: foldersCreateNestedOneWithoutNotesInput
    user: userCreateNestedOneWithoutNotesInput
    shares?: sharesCreateNestedManyWithoutNotesInput
  }

  export type notesUncheckedCreateWithoutNote_tagsInput = {
    id: string
    name: string
    content?: string | null
    user_id: string
    parent_id?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    is_pinned?: boolean | null
    is_public?: boolean | null
    shares?: sharesUncheckedCreateNestedManyWithoutNotesInput
  }

  export type notesCreateOrConnectWithoutNote_tagsInput = {
    where: notesWhereUniqueInput
    create: XOR<notesCreateWithoutNote_tagsInput, notesUncheckedCreateWithoutNote_tagsInput>
  }

  export type tagsCreateWithoutNote_tagsInput = {
    id: string
    name: string
    created_at?: Date | string | null
    user: userCreateNestedOneWithoutTagsInput
  }

  export type tagsUncheckedCreateWithoutNote_tagsInput = {
    id: string
    name: string
    user_id: string
    created_at?: Date | string | null
  }

  export type tagsCreateOrConnectWithoutNote_tagsInput = {
    where: tagsWhereUniqueInput
    create: XOR<tagsCreateWithoutNote_tagsInput, tagsUncheckedCreateWithoutNote_tagsInput>
  }

  export type notesUpsertWithoutNote_tagsInput = {
    update: XOR<notesUpdateWithoutNote_tagsInput, notesUncheckedUpdateWithoutNote_tagsInput>
    create: XOR<notesCreateWithoutNote_tagsInput, notesUncheckedCreateWithoutNote_tagsInput>
    where?: notesWhereInput
  }

  export type notesUpdateToOneWithWhereWithoutNote_tagsInput = {
    where?: notesWhereInput
    data: XOR<notesUpdateWithoutNote_tagsInput, notesUncheckedUpdateWithoutNote_tagsInput>
  }

  export type notesUpdateWithoutNote_tagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_pinned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_public?: NullableBoolFieldUpdateOperationsInput | boolean | null
    folders?: foldersUpdateOneWithoutNotesNestedInput
    user?: userUpdateOneRequiredWithoutNotesNestedInput
    shares?: sharesUpdateManyWithoutNotesNestedInput
  }

  export type notesUncheckedUpdateWithoutNote_tagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_pinned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_public?: NullableBoolFieldUpdateOperationsInput | boolean | null
    shares?: sharesUncheckedUpdateManyWithoutNotesNestedInput
  }

  export type tagsUpsertWithoutNote_tagsInput = {
    update: XOR<tagsUpdateWithoutNote_tagsInput, tagsUncheckedUpdateWithoutNote_tagsInput>
    create: XOR<tagsCreateWithoutNote_tagsInput, tagsUncheckedCreateWithoutNote_tagsInput>
    where?: tagsWhereInput
  }

  export type tagsUpdateToOneWithWhereWithoutNote_tagsInput = {
    where?: tagsWhereInput
    data: XOR<tagsUpdateWithoutNote_tagsInput, tagsUncheckedUpdateWithoutNote_tagsInput>
  }

  export type tagsUpdateWithoutNote_tagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    user?: userUpdateOneRequiredWithoutTagsNestedInput
  }

  export type tagsUncheckedUpdateWithoutNote_tagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type note_tagsCreateWithoutNotesInput = {
    tags: tagsCreateNestedOneWithoutNote_tagsInput
  }

  export type note_tagsUncheckedCreateWithoutNotesInput = {
    tag_id: string
  }

  export type note_tagsCreateOrConnectWithoutNotesInput = {
    where: note_tagsWhereUniqueInput
    create: XOR<note_tagsCreateWithoutNotesInput, note_tagsUncheckedCreateWithoutNotesInput>
  }

  export type note_tagsCreateManyNotesInputEnvelope = {
    data: note_tagsCreateManyNotesInput | note_tagsCreateManyNotesInput[]
    skipDuplicates?: boolean
  }

  export type foldersCreateWithoutNotesInput = {
    id: string
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    folders?: foldersCreateNestedOneWithoutOther_foldersInput
    other_folders?: foldersCreateNestedManyWithoutFoldersInput
    user: userCreateNestedOneWithoutFoldersInput
  }

  export type foldersUncheckedCreateWithoutNotesInput = {
    id: string
    name: string
    user_id: string
    parent_id?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    other_folders?: foldersUncheckedCreateNestedManyWithoutFoldersInput
  }

  export type foldersCreateOrConnectWithoutNotesInput = {
    where: foldersWhereUniqueInput
    create: XOR<foldersCreateWithoutNotesInput, foldersUncheckedCreateWithoutNotesInput>
  }

  export type userCreateWithoutNotesInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    folders?: foldersCreateNestedManyWithoutUserInput
    shares?: sharesCreateNestedManyWithoutUserInput
    tags?: tagsCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutNotesInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    folders?: foldersUncheckedCreateNestedManyWithoutUserInput
    shares?: sharesUncheckedCreateNestedManyWithoutUserInput
    tags?: tagsUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutNotesInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutNotesInput, userUncheckedCreateWithoutNotesInput>
  }

  export type sharesCreateWithoutNotesInput = {
    id: string
    created_at?: Date | string | null
    expires_at?: Date | string | null
    permission?: $Enums.shares_permission | null
    user: userCreateNestedOneWithoutSharesInput
  }

  export type sharesUncheckedCreateWithoutNotesInput = {
    id: string
    user_id: string
    created_at?: Date | string | null
    expires_at?: Date | string | null
    permission?: $Enums.shares_permission | null
  }

  export type sharesCreateOrConnectWithoutNotesInput = {
    where: sharesWhereUniqueInput
    create: XOR<sharesCreateWithoutNotesInput, sharesUncheckedCreateWithoutNotesInput>
  }

  export type sharesCreateManyNotesInputEnvelope = {
    data: sharesCreateManyNotesInput | sharesCreateManyNotesInput[]
    skipDuplicates?: boolean
  }

  export type note_tagsUpsertWithWhereUniqueWithoutNotesInput = {
    where: note_tagsWhereUniqueInput
    update: XOR<note_tagsUpdateWithoutNotesInput, note_tagsUncheckedUpdateWithoutNotesInput>
    create: XOR<note_tagsCreateWithoutNotesInput, note_tagsUncheckedCreateWithoutNotesInput>
  }

  export type note_tagsUpdateWithWhereUniqueWithoutNotesInput = {
    where: note_tagsWhereUniqueInput
    data: XOR<note_tagsUpdateWithoutNotesInput, note_tagsUncheckedUpdateWithoutNotesInput>
  }

  export type note_tagsUpdateManyWithWhereWithoutNotesInput = {
    where: note_tagsScalarWhereInput
    data: XOR<note_tagsUpdateManyMutationInput, note_tagsUncheckedUpdateManyWithoutNotesInput>
  }

  export type note_tagsScalarWhereInput = {
    AND?: note_tagsScalarWhereInput | note_tagsScalarWhereInput[]
    OR?: note_tagsScalarWhereInput[]
    NOT?: note_tagsScalarWhereInput | note_tagsScalarWhereInput[]
    note_id?: StringFilter<"note_tags"> | string
    tag_id?: StringFilter<"note_tags"> | string
  }

  export type foldersUpsertWithoutNotesInput = {
    update: XOR<foldersUpdateWithoutNotesInput, foldersUncheckedUpdateWithoutNotesInput>
    create: XOR<foldersCreateWithoutNotesInput, foldersUncheckedCreateWithoutNotesInput>
    where?: foldersWhereInput
  }

  export type foldersUpdateToOneWithWhereWithoutNotesInput = {
    where?: foldersWhereInput
    data: XOR<foldersUpdateWithoutNotesInput, foldersUncheckedUpdateWithoutNotesInput>
  }

  export type foldersUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    folders?: foldersUpdateOneWithoutOther_foldersNestedInput
    other_folders?: foldersUpdateManyWithoutFoldersNestedInput
    user?: userUpdateOneRequiredWithoutFoldersNestedInput
  }

  export type foldersUncheckedUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    other_folders?: foldersUncheckedUpdateManyWithoutFoldersNestedInput
  }

  export type userUpsertWithoutNotesInput = {
    update: XOR<userUpdateWithoutNotesInput, userUncheckedUpdateWithoutNotesInput>
    create: XOR<userCreateWithoutNotesInput, userUncheckedCreateWithoutNotesInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutNotesInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutNotesInput, userUncheckedUpdateWithoutNotesInput>
  }

  export type userUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    folders?: foldersUpdateManyWithoutUserNestedInput
    shares?: sharesUpdateManyWithoutUserNestedInput
    tags?: tagsUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    folders?: foldersUncheckedUpdateManyWithoutUserNestedInput
    shares?: sharesUncheckedUpdateManyWithoutUserNestedInput
    tags?: tagsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type sharesUpsertWithWhereUniqueWithoutNotesInput = {
    where: sharesWhereUniqueInput
    update: XOR<sharesUpdateWithoutNotesInput, sharesUncheckedUpdateWithoutNotesInput>
    create: XOR<sharesCreateWithoutNotesInput, sharesUncheckedCreateWithoutNotesInput>
  }

  export type sharesUpdateWithWhereUniqueWithoutNotesInput = {
    where: sharesWhereUniqueInput
    data: XOR<sharesUpdateWithoutNotesInput, sharesUncheckedUpdateWithoutNotesInput>
  }

  export type sharesUpdateManyWithWhereWithoutNotesInput = {
    where: sharesScalarWhereInput
    data: XOR<sharesUpdateManyMutationInput, sharesUncheckedUpdateManyWithoutNotesInput>
  }

  export type sharesScalarWhereInput = {
    AND?: sharesScalarWhereInput | sharesScalarWhereInput[]
    OR?: sharesScalarWhereInput[]
    NOT?: sharesScalarWhereInput | sharesScalarWhereInput[]
    id?: StringFilter<"shares"> | string
    note_id?: StringFilter<"shares"> | string
    user_id?: StringFilter<"shares"> | string
    created_at?: DateTimeNullableFilter<"shares"> | Date | string | null
    expires_at?: DateTimeNullableFilter<"shares"> | Date | string | null
    permission?: Enumshares_permissionNullableFilter<"shares"> | $Enums.shares_permission | null
  }

  export type notesCreateWithoutSharesInput = {
    id: string
    name: string
    content?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    is_pinned?: boolean | null
    is_public?: boolean | null
    note_tags?: note_tagsCreateNestedManyWithoutNotesInput
    folders?: foldersCreateNestedOneWithoutNotesInput
    user: userCreateNestedOneWithoutNotesInput
  }

  export type notesUncheckedCreateWithoutSharesInput = {
    id: string
    name: string
    content?: string | null
    user_id: string
    parent_id?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    is_pinned?: boolean | null
    is_public?: boolean | null
    note_tags?: note_tagsUncheckedCreateNestedManyWithoutNotesInput
  }

  export type notesCreateOrConnectWithoutSharesInput = {
    where: notesWhereUniqueInput
    create: XOR<notesCreateWithoutSharesInput, notesUncheckedCreateWithoutSharesInput>
  }

  export type userCreateWithoutSharesInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    folders?: foldersCreateNestedManyWithoutUserInput
    notes?: notesCreateNestedManyWithoutUserInput
    tags?: tagsCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutSharesInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    folders?: foldersUncheckedCreateNestedManyWithoutUserInput
    notes?: notesUncheckedCreateNestedManyWithoutUserInput
    tags?: tagsUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutSharesInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutSharesInput, userUncheckedCreateWithoutSharesInput>
  }

  export type notesUpsertWithoutSharesInput = {
    update: XOR<notesUpdateWithoutSharesInput, notesUncheckedUpdateWithoutSharesInput>
    create: XOR<notesCreateWithoutSharesInput, notesUncheckedCreateWithoutSharesInput>
    where?: notesWhereInput
  }

  export type notesUpdateToOneWithWhereWithoutSharesInput = {
    where?: notesWhereInput
    data: XOR<notesUpdateWithoutSharesInput, notesUncheckedUpdateWithoutSharesInput>
  }

  export type notesUpdateWithoutSharesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_pinned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_public?: NullableBoolFieldUpdateOperationsInput | boolean | null
    note_tags?: note_tagsUpdateManyWithoutNotesNestedInput
    folders?: foldersUpdateOneWithoutNotesNestedInput
    user?: userUpdateOneRequiredWithoutNotesNestedInput
  }

  export type notesUncheckedUpdateWithoutSharesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_pinned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_public?: NullableBoolFieldUpdateOperationsInput | boolean | null
    note_tags?: note_tagsUncheckedUpdateManyWithoutNotesNestedInput
  }

  export type userUpsertWithoutSharesInput = {
    update: XOR<userUpdateWithoutSharesInput, userUncheckedUpdateWithoutSharesInput>
    create: XOR<userCreateWithoutSharesInput, userUncheckedCreateWithoutSharesInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutSharesInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutSharesInput, userUncheckedUpdateWithoutSharesInput>
  }

  export type userUpdateWithoutSharesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    folders?: foldersUpdateManyWithoutUserNestedInput
    notes?: notesUpdateManyWithoutUserNestedInput
    tags?: tagsUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutSharesInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    folders?: foldersUncheckedUpdateManyWithoutUserNestedInput
    notes?: notesUncheckedUpdateManyWithoutUserNestedInput
    tags?: tagsUncheckedUpdateManyWithoutUserNestedInput
  }

  export type note_tagsCreateWithoutTagsInput = {
    notes: notesCreateNestedOneWithoutNote_tagsInput
  }

  export type note_tagsUncheckedCreateWithoutTagsInput = {
    note_id: string
  }

  export type note_tagsCreateOrConnectWithoutTagsInput = {
    where: note_tagsWhereUniqueInput
    create: XOR<note_tagsCreateWithoutTagsInput, note_tagsUncheckedCreateWithoutTagsInput>
  }

  export type note_tagsCreateManyTagsInputEnvelope = {
    data: note_tagsCreateManyTagsInput | note_tagsCreateManyTagsInput[]
    skipDuplicates?: boolean
  }

  export type userCreateWithoutTagsInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    folders?: foldersCreateNestedManyWithoutUserInput
    notes?: notesCreateNestedManyWithoutUserInput
    shares?: sharesCreateNestedManyWithoutUserInput
  }

  export type userUncheckedCreateWithoutTagsInput = {
    id: string
    name: string
    email: string
    emailVerified: boolean
    image?: string | null
    createdAt: Date | string
    updatedAt: Date | string
    folders?: foldersUncheckedCreateNestedManyWithoutUserInput
    notes?: notesUncheckedCreateNestedManyWithoutUserInput
    shares?: sharesUncheckedCreateNestedManyWithoutUserInput
  }

  export type userCreateOrConnectWithoutTagsInput = {
    where: userWhereUniqueInput
    create: XOR<userCreateWithoutTagsInput, userUncheckedCreateWithoutTagsInput>
  }

  export type note_tagsUpsertWithWhereUniqueWithoutTagsInput = {
    where: note_tagsWhereUniqueInput
    update: XOR<note_tagsUpdateWithoutTagsInput, note_tagsUncheckedUpdateWithoutTagsInput>
    create: XOR<note_tagsCreateWithoutTagsInput, note_tagsUncheckedCreateWithoutTagsInput>
  }

  export type note_tagsUpdateWithWhereUniqueWithoutTagsInput = {
    where: note_tagsWhereUniqueInput
    data: XOR<note_tagsUpdateWithoutTagsInput, note_tagsUncheckedUpdateWithoutTagsInput>
  }

  export type note_tagsUpdateManyWithWhereWithoutTagsInput = {
    where: note_tagsScalarWhereInput
    data: XOR<note_tagsUpdateManyMutationInput, note_tagsUncheckedUpdateManyWithoutTagsInput>
  }

  export type userUpsertWithoutTagsInput = {
    update: XOR<userUpdateWithoutTagsInput, userUncheckedUpdateWithoutTagsInput>
    create: XOR<userCreateWithoutTagsInput, userUncheckedCreateWithoutTagsInput>
    where?: userWhereInput
  }

  export type userUpdateToOneWithWhereWithoutTagsInput = {
    where?: userWhereInput
    data: XOR<userUpdateWithoutTagsInput, userUncheckedUpdateWithoutTagsInput>
  }

  export type userUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    folders?: foldersUpdateManyWithoutUserNestedInput
    notes?: notesUpdateManyWithoutUserNestedInput
    shares?: sharesUpdateManyWithoutUserNestedInput
  }

  export type userUncheckedUpdateWithoutTagsInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    emailVerified?: BoolFieldUpdateOperationsInput | boolean
    image?: NullableStringFieldUpdateOperationsInput | string | null
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
    folders?: foldersUncheckedUpdateManyWithoutUserNestedInput
    notes?: notesUncheckedUpdateManyWithoutUserNestedInput
    shares?: sharesUncheckedUpdateManyWithoutUserNestedInput
  }

  export type foldersCreateWithoutUserInput = {
    id: string
    name: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    folders?: foldersCreateNestedOneWithoutOther_foldersInput
    other_folders?: foldersCreateNestedManyWithoutFoldersInput
    notes?: notesCreateNestedManyWithoutFoldersInput
  }

  export type foldersUncheckedCreateWithoutUserInput = {
    id: string
    name: string
    parent_id?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    other_folders?: foldersUncheckedCreateNestedManyWithoutFoldersInput
    notes?: notesUncheckedCreateNestedManyWithoutFoldersInput
  }

  export type foldersCreateOrConnectWithoutUserInput = {
    where: foldersWhereUniqueInput
    create: XOR<foldersCreateWithoutUserInput, foldersUncheckedCreateWithoutUserInput>
  }

  export type foldersCreateManyUserInputEnvelope = {
    data: foldersCreateManyUserInput | foldersCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type notesCreateWithoutUserInput = {
    id: string
    name: string
    content?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    is_pinned?: boolean | null
    is_public?: boolean | null
    note_tags?: note_tagsCreateNestedManyWithoutNotesInput
    folders?: foldersCreateNestedOneWithoutNotesInput
    shares?: sharesCreateNestedManyWithoutNotesInput
  }

  export type notesUncheckedCreateWithoutUserInput = {
    id: string
    name: string
    content?: string | null
    parent_id?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    is_pinned?: boolean | null
    is_public?: boolean | null
    note_tags?: note_tagsUncheckedCreateNestedManyWithoutNotesInput
    shares?: sharesUncheckedCreateNestedManyWithoutNotesInput
  }

  export type notesCreateOrConnectWithoutUserInput = {
    where: notesWhereUniqueInput
    create: XOR<notesCreateWithoutUserInput, notesUncheckedCreateWithoutUserInput>
  }

  export type notesCreateManyUserInputEnvelope = {
    data: notesCreateManyUserInput | notesCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type sharesCreateWithoutUserInput = {
    id: string
    created_at?: Date | string | null
    expires_at?: Date | string | null
    permission?: $Enums.shares_permission | null
    notes: notesCreateNestedOneWithoutSharesInput
  }

  export type sharesUncheckedCreateWithoutUserInput = {
    id: string
    note_id: string
    created_at?: Date | string | null
    expires_at?: Date | string | null
    permission?: $Enums.shares_permission | null
  }

  export type sharesCreateOrConnectWithoutUserInput = {
    where: sharesWhereUniqueInput
    create: XOR<sharesCreateWithoutUserInput, sharesUncheckedCreateWithoutUserInput>
  }

  export type sharesCreateManyUserInputEnvelope = {
    data: sharesCreateManyUserInput | sharesCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type tagsCreateWithoutUserInput = {
    id: string
    name: string
    created_at?: Date | string | null
    note_tags?: note_tagsCreateNestedManyWithoutTagsInput
  }

  export type tagsUncheckedCreateWithoutUserInput = {
    id: string
    name: string
    created_at?: Date | string | null
    note_tags?: note_tagsUncheckedCreateNestedManyWithoutTagsInput
  }

  export type tagsCreateOrConnectWithoutUserInput = {
    where: tagsWhereUniqueInput
    create: XOR<tagsCreateWithoutUserInput, tagsUncheckedCreateWithoutUserInput>
  }

  export type tagsCreateManyUserInputEnvelope = {
    data: tagsCreateManyUserInput | tagsCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type foldersUpsertWithWhereUniqueWithoutUserInput = {
    where: foldersWhereUniqueInput
    update: XOR<foldersUpdateWithoutUserInput, foldersUncheckedUpdateWithoutUserInput>
    create: XOR<foldersCreateWithoutUserInput, foldersUncheckedCreateWithoutUserInput>
  }

  export type foldersUpdateWithWhereUniqueWithoutUserInput = {
    where: foldersWhereUniqueInput
    data: XOR<foldersUpdateWithoutUserInput, foldersUncheckedUpdateWithoutUserInput>
  }

  export type foldersUpdateManyWithWhereWithoutUserInput = {
    where: foldersScalarWhereInput
    data: XOR<foldersUpdateManyMutationInput, foldersUncheckedUpdateManyWithoutUserInput>
  }

  export type notesUpsertWithWhereUniqueWithoutUserInput = {
    where: notesWhereUniqueInput
    update: XOR<notesUpdateWithoutUserInput, notesUncheckedUpdateWithoutUserInput>
    create: XOR<notesCreateWithoutUserInput, notesUncheckedCreateWithoutUserInput>
  }

  export type notesUpdateWithWhereUniqueWithoutUserInput = {
    where: notesWhereUniqueInput
    data: XOR<notesUpdateWithoutUserInput, notesUncheckedUpdateWithoutUserInput>
  }

  export type notesUpdateManyWithWhereWithoutUserInput = {
    where: notesScalarWhereInput
    data: XOR<notesUpdateManyMutationInput, notesUncheckedUpdateManyWithoutUserInput>
  }

  export type sharesUpsertWithWhereUniqueWithoutUserInput = {
    where: sharesWhereUniqueInput
    update: XOR<sharesUpdateWithoutUserInput, sharesUncheckedUpdateWithoutUserInput>
    create: XOR<sharesCreateWithoutUserInput, sharesUncheckedCreateWithoutUserInput>
  }

  export type sharesUpdateWithWhereUniqueWithoutUserInput = {
    where: sharesWhereUniqueInput
    data: XOR<sharesUpdateWithoutUserInput, sharesUncheckedUpdateWithoutUserInput>
  }

  export type sharesUpdateManyWithWhereWithoutUserInput = {
    where: sharesScalarWhereInput
    data: XOR<sharesUpdateManyMutationInput, sharesUncheckedUpdateManyWithoutUserInput>
  }

  export type tagsUpsertWithWhereUniqueWithoutUserInput = {
    where: tagsWhereUniqueInput
    update: XOR<tagsUpdateWithoutUserInput, tagsUncheckedUpdateWithoutUserInput>
    create: XOR<tagsCreateWithoutUserInput, tagsUncheckedCreateWithoutUserInput>
  }

  export type tagsUpdateWithWhereUniqueWithoutUserInput = {
    where: tagsWhereUniqueInput
    data: XOR<tagsUpdateWithoutUserInput, tagsUncheckedUpdateWithoutUserInput>
  }

  export type tagsUpdateManyWithWhereWithoutUserInput = {
    where: tagsScalarWhereInput
    data: XOR<tagsUpdateManyMutationInput, tagsUncheckedUpdateManyWithoutUserInput>
  }

  export type tagsScalarWhereInput = {
    AND?: tagsScalarWhereInput | tagsScalarWhereInput[]
    OR?: tagsScalarWhereInput[]
    NOT?: tagsScalarWhereInput | tagsScalarWhereInput[]
    id?: StringFilter<"tags"> | string
    name?: StringFilter<"tags"> | string
    user_id?: StringFilter<"tags"> | string
    created_at?: DateTimeNullableFilter<"tags"> | Date | string | null
  }

  export type auth_sessionsCreateManyAuth_usersInput = {
    id: string
    expires_at: Date | string
    created_at?: Date | string | null
  }

  export type auth_sessionsUpdateWithoutAuth_usersInput = {
    id?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type auth_sessionsUncheckedUpdateWithoutAuth_usersInput = {
    id?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type auth_sessionsUncheckedUpdateManyWithoutAuth_usersInput = {
    id?: StringFieldUpdateOperationsInput | string
    expires_at?: DateTimeFieldUpdateOperationsInput | Date | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type foldersCreateManyFoldersInput = {
    id: string
    name: string
    user_id: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type notesCreateManyFoldersInput = {
    id: string
    name: string
    content?: string | null
    user_id: string
    created_at?: Date | string | null
    updated_at?: Date | string | null
    is_pinned?: boolean | null
    is_public?: boolean | null
  }

  export type foldersUpdateWithoutFoldersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    other_folders?: foldersUpdateManyWithoutFoldersNestedInput
    user?: userUpdateOneRequiredWithoutFoldersNestedInput
    notes?: notesUpdateManyWithoutFoldersNestedInput
  }

  export type foldersUncheckedUpdateWithoutFoldersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    other_folders?: foldersUncheckedUpdateManyWithoutFoldersNestedInput
    notes?: notesUncheckedUpdateManyWithoutFoldersNestedInput
  }

  export type foldersUncheckedUpdateManyWithoutFoldersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type notesUpdateWithoutFoldersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_pinned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_public?: NullableBoolFieldUpdateOperationsInput | boolean | null
    note_tags?: note_tagsUpdateManyWithoutNotesNestedInput
    user?: userUpdateOneRequiredWithoutNotesNestedInput
    shares?: sharesUpdateManyWithoutNotesNestedInput
  }

  export type notesUncheckedUpdateWithoutFoldersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_pinned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_public?: NullableBoolFieldUpdateOperationsInput | boolean | null
    note_tags?: note_tagsUncheckedUpdateManyWithoutNotesNestedInput
    shares?: sharesUncheckedUpdateManyWithoutNotesNestedInput
  }

  export type notesUncheckedUpdateManyWithoutFoldersInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_pinned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_public?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type note_tagsCreateManyNotesInput = {
    tag_id: string
  }

  export type sharesCreateManyNotesInput = {
    id: string
    user_id: string
    created_at?: Date | string | null
    expires_at?: Date | string | null
    permission?: $Enums.shares_permission | null
  }

  export type note_tagsUpdateWithoutNotesInput = {
    tags?: tagsUpdateOneRequiredWithoutNote_tagsNestedInput
  }

  export type note_tagsUncheckedUpdateWithoutNotesInput = {
    tag_id?: StringFieldUpdateOperationsInput | string
  }

  export type note_tagsUncheckedUpdateManyWithoutNotesInput = {
    tag_id?: StringFieldUpdateOperationsInput | string
  }

  export type sharesUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    permission?: NullableEnumshares_permissionFieldUpdateOperationsInput | $Enums.shares_permission | null
    user?: userUpdateOneRequiredWithoutSharesNestedInput
  }

  export type sharesUncheckedUpdateWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    permission?: NullableEnumshares_permissionFieldUpdateOperationsInput | $Enums.shares_permission | null
  }

  export type sharesUncheckedUpdateManyWithoutNotesInput = {
    id?: StringFieldUpdateOperationsInput | string
    user_id?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    permission?: NullableEnumshares_permissionFieldUpdateOperationsInput | $Enums.shares_permission | null
  }

  export type note_tagsCreateManyTagsInput = {
    note_id: string
  }

  export type note_tagsUpdateWithoutTagsInput = {
    notes?: notesUpdateOneRequiredWithoutNote_tagsNestedInput
  }

  export type note_tagsUncheckedUpdateWithoutTagsInput = {
    note_id?: StringFieldUpdateOperationsInput | string
  }

  export type note_tagsUncheckedUpdateManyWithoutTagsInput = {
    note_id?: StringFieldUpdateOperationsInput | string
  }

  export type foldersCreateManyUserInput = {
    id: string
    name: string
    parent_id?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
  }

  export type notesCreateManyUserInput = {
    id: string
    name: string
    content?: string | null
    parent_id?: string | null
    created_at?: Date | string | null
    updated_at?: Date | string | null
    is_pinned?: boolean | null
    is_public?: boolean | null
  }

  export type sharesCreateManyUserInput = {
    id: string
    note_id: string
    created_at?: Date | string | null
    expires_at?: Date | string | null
    permission?: $Enums.shares_permission | null
  }

  export type tagsCreateManyUserInput = {
    id: string
    name: string
    created_at?: Date | string | null
  }

  export type foldersUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    folders?: foldersUpdateOneWithoutOther_foldersNestedInput
    other_folders?: foldersUpdateManyWithoutFoldersNestedInput
    notes?: notesUpdateManyWithoutFoldersNestedInput
  }

  export type foldersUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    other_folders?: foldersUncheckedUpdateManyWithoutFoldersNestedInput
    notes?: notesUncheckedUpdateManyWithoutFoldersNestedInput
  }

  export type foldersUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    parent_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type notesUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_pinned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_public?: NullableBoolFieldUpdateOperationsInput | boolean | null
    note_tags?: note_tagsUpdateManyWithoutNotesNestedInput
    folders?: foldersUpdateOneWithoutNotesNestedInput
    shares?: sharesUpdateManyWithoutNotesNestedInput
  }

  export type notesUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    parent_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_pinned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_public?: NullableBoolFieldUpdateOperationsInput | boolean | null
    note_tags?: note_tagsUncheckedUpdateManyWithoutNotesNestedInput
    shares?: sharesUncheckedUpdateManyWithoutNotesNestedInput
  }

  export type notesUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    content?: NullableStringFieldUpdateOperationsInput | string | null
    parent_id?: NullableStringFieldUpdateOperationsInput | string | null
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    updated_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    is_pinned?: NullableBoolFieldUpdateOperationsInput | boolean | null
    is_public?: NullableBoolFieldUpdateOperationsInput | boolean | null
  }

  export type sharesUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    permission?: NullableEnumshares_permissionFieldUpdateOperationsInput | $Enums.shares_permission | null
    notes?: notesUpdateOneRequiredWithoutSharesNestedInput
  }

  export type sharesUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    note_id?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    permission?: NullableEnumshares_permissionFieldUpdateOperationsInput | $Enums.shares_permission | null
  }

  export type sharesUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    note_id?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    expires_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    permission?: NullableEnumshares_permissionFieldUpdateOperationsInput | $Enums.shares_permission | null
  }

  export type tagsUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note_tags?: note_tagsUpdateManyWithoutTagsNestedInput
  }

  export type tagsUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    note_tags?: note_tagsUncheckedUpdateManyWithoutTagsNestedInput
  }

  export type tagsUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    name?: StringFieldUpdateOperationsInput | string
    created_at?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}