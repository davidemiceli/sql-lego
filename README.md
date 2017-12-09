# sql-lego
SQL Lego is a lightweight library for building and composing SQL string statements without the standard order.

## Installation
To install sql-lego with npm package manager
```
npm install sql-lego
```

## Getting Started
```javascript
// Requirements
const SQLego = require('sql-lego');

// Init sqlego instance
const sqlb = new SQLego();

// Compose query in unordered way
sqlb.query.limit = [0,10];
sqlb.query.from = [`users AS u`];
sqlb.query.where.push({
  operator: 'AND',
  condition: 'u.age >= 30'
},{
  operator: 'OR',
  condition: `p.tag = 'travel'`
});
sqlb.query.select = [
  'u.id AS user_id',
  `COUNT(*) AS num`
];
sqlb.query.orderby = ['num DESC'];
sqlb.query.joins = [
  `INNER JOIN posts AS p ON p.user_id=u.id`,
];
sqlb.query.groupby = ['u.id'];

sqlb.query.where.push({
  operator: 'OR',
  condition: `p.tag = 'food'`
});

// Return the sql string in the right order
const result = sqlb.toSQL();
console.log(result);
```

## Notes
It supports also the `OFFSET` condition (for example, used by Apche Drill):
```javascript
sqlb.query.offset = [30];
```