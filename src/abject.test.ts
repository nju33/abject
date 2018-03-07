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

const iAbject = abject as abject.Fn<typeof post, IdealPost>;


describe('abject', () => {
  test('fn', () => {
    const idealPost = iAbject(post, {
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
  });
});
