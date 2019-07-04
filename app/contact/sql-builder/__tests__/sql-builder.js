describe('SQL Builder', () => {
  test('build list query', () => {
    const sqlBuilder = require('../')
    const [sql, params] = sqlBuilder.buildListQuery(153, 239, ['UserID', 'Title'], ['Name']);

    expect(sql).toBe(
      'SELECT UserID, Title, Name, BirthDate, IsFavorite, DetailCount FROM ContactSummary'
      + ' ORDER BY UserID, Title ASC Name DESC'
      + ' LIMIT :offset, :limit',
    );
    expect(params).toStrictEqual({limit: 239, offset: 153});
  });

  test('build filter query', () => {
    const sqlBuilder = require('../')
    const [sql, params] = sqlBuilder.buildFilterQuery('some', 153, 239, ['UserID', 'Title'], ['Name']);

    expect(sql).toBe(
      'SELECT UserID, Title, Name, BirthDate, IsFavorite, DetailCount FROM ContactSummary'
      + ' WHERE Name LIKE :keyword'
      + ' ORDER BY UserID, Title ASC Name DESC'
      + ' LIMIT :offset, :limit',
    );
    expect(params).toStrictEqual({keyword: '%some%',limit: 239, offset: 153});
  });
});
