//import Parse from 'parse'

export function save<T extends Parse.Object>(
  object: T,
  useMasterKey: boolean,
  sessionToken?: string
) {
  return new Promise<T>((resolve, reject) => {
    object.save(null, {
      success: result => {
        resolve(result);
      },
      error: (_, e) => {
        reject(convertError(e));
      },
      useMasterKey,
      sessionToken
    });
  });
}

export function getOne<T extends Parse.Object>(
  obj: T,
  query: { [key: string]: any },
  useMasterKey: boolean,
  fields: string[] = [],
  includes?: string[],
  sessionToken?: string
) {
  const q = new Parse.Query(obj.className) as Parse.Query<T>;
  for (let key of Object.keys(query)) {
    q.equalTo(key, query[key]);
  }
  for (let field of fields) {
    q.select(field);
  }
  if (includes) {
    q.include(includes);
  }

  return first(q, useMasterKey, sessionToken);
}

export function getRoleByName(name: string) {
  const q = new Parse.Query(Parse.Role);
  q.equalTo("name", name);
  return first(q, true);
}

function convertError(e: Parse.Error | Error) {
  if (e instanceof Error) {
    if (!e.stack) {
      Error.captureStackTrace(e);
    }
    return e;
  } else {
    return new Error(`${e.code}: ${e.message}`);
  }
}

export function get<T extends Parse.Object>(
  classOrQuery: Parse.Query<T>,// | T,
  id: string,
  useMasterKey: boolean,
  sessionToken?: string
) {
  return new Promise<T>((resolve, reject) => {
    const q = classOrQuery;
    /// Uncomment this after the @types/parse get fixed
      // classOrQuery instanceof Parse.Query
      //   ? classOrQuery
      //   : new Parse.Query(classOrQuery.className);
    return q.get(id, {
      success: result => {
        resolve(result);
      },
      error: e => {
        reject(convertError(e));
      },
      useMasterKey,
      sessionToken
    });
  });
}

export function find<T extends Parse.Object>(
  q: Parse.Query<T>,
  useMasterKey: boolean,
  sessionToken?: string
) {
  return new Promise<T[]>((resolve, reject) => {
    return q.find({
      success: result => {
        resolve(result);
      },
      error: e => {
        reject(convertError(e));
      },
      useMasterKey,
      sessionToken
    });
  });
}

export function first<T extends Parse.Object>(
  q: Parse.Query<T>,
  useMasterKey: boolean,
  sessionToken?: string
) {
  return new Promise<T | undefined>((resolve, reject) => {
    q.first({
      success: result => {
        resolve(result);
      },
      error: e => {
        reject(convertError(e));
      },
      useMasterKey,
      sessionToken
    });
  });
}
