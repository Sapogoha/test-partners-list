interface ILinks {
  [key: string]: string;
}

const start: string = '/test-partners-list';

const links: ILinks = {
  main: start,
  partnerNoId: `${start}/partner`,
  partner: `${start}/partner/:id`,
  signin: `${start}/signin`,
  signup: `${start}/signup`,
};

export default links;
