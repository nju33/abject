# abject

Get property value from an object by alias name

[![npm: abject](https://img.shields.io/npm/v/abject.svg)](https://www.npmjs.com/package/abject)
[![CircleCI](https://circleci.com/gh/nju33/abject.svg?style=svg&circle-token=1ec2139002dd40b9c16f65fbae8331ab3be5d5b1)](https://circleci.com/gh/nju33/abject)
[![Coverage Status](https://coveralls.io/repos/github/nju33/abject/badge.svg?branch=master)](https://coveralls.io/github/nju33/abject?branch=master)
[![tested with jest](https://img.shields.io/badge/tested_with-jest-99424f.svg)](https://github.com/facebook/jest)
[![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)
![license: mit](https://img.shields.io/packagist/l/doctrine/orm.svg)
[![TypeScript](https://badges.frapsoft.com/typescript/code/typescript.svg?v=101)](https://github.com/ellerbrock/typescript-badges/)


## Install

```bash
yarn add [-D] abject
```

## Usage

```ts
import abject from './abject';

const post = {
  post: {
    id: 1,
    title: 'title',
    url: 'https://example.com',
    category: {
      id: 1,
      name: 'hoge'
    },
    tags: [
      {
        id: 1,
        name: 'foo',
      },
      {
        id: 2,
        name: 'bar',
      }
    ]
  }
}
interface IdealPost {
  id: number
  title: string,
  url: string,
  category: string,
  tags: [string, string]
}

const idealPostAbject = abject as abject.Fn<typeof post, IdealPost>;

/**
 * Register an alias with its actual path
 * `{ alias: actualPath }`
 */
const idealPost = idealPostAbject(post, {
  id: 'post.id',
  title: 'post.title',
  url: 'post.url',
  category: 'post.category.name',
  tags: 'post.tags[].name'
});

const id = idealPost('id')
// const id: number
expect(id).toBe(1);

const category = idealPost('category');
// const category: string
expect(category).toBe('hoge');

const tags = idealPost('tags');
// const tags: [string, string]
expect(tags).toEqual(
  expect.arrayContaining(['foo', 'bar'])
);
```
