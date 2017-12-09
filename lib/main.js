'use strict';

// Utility to build an SQL query without order and in a more clean way
module.exports = function(squery) {

  this.query = {
    select: [],
    from: [],
    joins: [],
    where: [],
    groupby: [],
    orderby: [],
    having: [],
    limit: [],
    offset: []
  };
  
  if (typeof(squery) !== 'undefined') {
    if (squery.select) this.query.select = squery.select;
    if (squery.from) this.query.from = squery.from;
    if (squery.joins) this.query.joins = squery.joins;
    if (squery.where) this.query.where = squery.where;
    if (squery.groupby) this.query.groupby = squery.groupby;
    if (squery.orderby) this.query.orderby = squery.orderby;
    if (squery.having) this.query.having = squery.having;
    if (squery.limit) this.query.limit = squery.limit;
    if (squery.offset) this.query.offset = squery.offset;
  }
  
  this.addIfnotEmpty = function(as_start, clausules) {
    return (clausules.length < 1) ? ' ' : ` ${as_start} `;
  }

  this.toOnlyConditions = function(clausules) {
    let fullclausule = '';
    for (let i = 0; i < clausules.length; i++) {
      const preoprt = (i === 0) ? '' : `${clausules[i].operator} `;
      fullclausule += (typeof clausules[i] === 'string') ? `(${clausules[i]}) ` : `${preoprt}(${clausules[i].condition}) `;
    }
    return fullclausule;
  }

  this.toConditions = function(as_start, clausules) {
    return this.addIfnotEmpty(as_start, clausules) + this.toOnlyConditions(clausules);
  }

  this.toSQL = function() {
    let resSQL = this.addIfnotEmpty('SELECT', this.query.select) + this.query.select.join();
    resSQL += this.addIfnotEmpty('FROM', this.query.from) + this.query.from.join();
    for (let i = 0; i < this.query.joins.length; i++) {
      resSQL += ' ' + this.query.joins[i];
    }
    resSQL += this.toConditions('WHERE', this.query.where);
    resSQL += this.addIfnotEmpty('GROUP BY', this.query.groupby) + this.query.groupby.join();
    resSQL += this.toConditions('HAVING', this.query.having);
    resSQL += this.addIfnotEmpty('ORDER BY', this.query.orderby) + this.query.orderby.join();
    resSQL += this.addIfnotEmpty('LIMIT', this.query.limit) + this.query.limit.join();
    resSQL += this.addIfnotEmpty('OFFSET', this.query.offset) + this.query.offset.join();
    // resSQL = resSQL.replace(/\s\s+/g, ' ');
    return resSQL;
  }

};
