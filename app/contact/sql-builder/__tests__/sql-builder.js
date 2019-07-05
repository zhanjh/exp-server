describe('SQL Builder', () => {
  test('build list query', () => {
    const sqlBuilder = require('../');
    const [sql, params] = sqlBuilder.buildListQuery(153, 239, ['UserID', 'Title'], ['Name']);

    expect(sql).toBe(
      'SELECT UserID, Title, Name, BirthDate, IsFavorite, DetailCount FROM ContactSummary'
      + ' ORDER BY UserID, Title ASC Name DESC'
      + ' LIMIT :offset, :limit',
    );
    expect(params).toStrictEqual({limit: 239, offset: 153});
  });

  test('build filter query', () => {
    const sqlBuilder = require('../');
    const [sql, params] = sqlBuilder.buildFilterQuery('some', 153, 239, ['UserID', 'Title'], ['Name']);

    expect(sql).toBe(
      'SELECT UserID, Title, Name, BirthDate, IsFavorite, DetailCount FROM ContactSummary'
      + ' WHERE Name LIKE :keyword'
      + ' ORDER BY UserID, Title ASC Name DESC'
      + ' LIMIT :offset, :limit',
    );
    expect(params).toStrictEqual({keyword: '%some%',limit: 239, offset: 153});
  });

  test('build fetch query', () => {
    const sqlBuilder = require('../');
    const [sql, params] = sqlBuilder.buildFetchQuery(100);

    expect(sql).toBe(
      'SELECT UserID, Title, Name, BirthDate, IsFavorite, DetailCount FROM ContactSummary'
      + ' WHERE UserID = :userID'
      + ' LIMIT 1',
    );
    expect(params).toStrictEqual({userID: 100});
  });

  test('build details query', () => {
    const sqlBuilder = require('../');
    const [sql, params] = sqlBuilder.buildDetailsQuery(100);

    expect(sql).toBe(
      'SELECT UserID, ContactDetailType, ContactDetailContent FROM ContactDetail'
      + ' WHERE UserID = :userID'
    );
    expect(params).toStrictEqual({userID: 100});
  });
});
