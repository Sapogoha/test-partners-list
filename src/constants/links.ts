interface ILinks {
  [key: string]: string;
}

const start: string = '/test-partners-list';

const links: ILinks = {
  main: start,
  partner: `${start}/partner/:id`,
  signin: `${start}/signin`,
  signup: `${start}/signup`,
  product: `${start}/catalog/:id`,
  contacts: `${start}/contacts`,
};

export default links;
