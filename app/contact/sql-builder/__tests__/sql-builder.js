describe('SQL Builder', () => {
  test('build list query', () => {
    const sqlBuilder = require('../')
    const [sql, params] = sqlBuilder.buildListQuery(153, 239, ['UserID', 'Title'], ['Name']);

    expect(sql).toBe(
      "SELECT UserID, Title, Name, BirthDate, IsFavorite, DetailCount FROM ContactSummary"
      + " ORDER BY :asc ASC :desc DESC"
      + " LIMIT :offset, :limit",
    );
    expect(params).toStrictEqual({asc: "UserID, Title", desc: "Name", limit: 239, offset: 153});
  });
});
