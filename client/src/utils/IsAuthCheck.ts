export const IsAuthCheck = (lsToken: string, TokenAtom: string) =>
  lsToken || TokenAtom ? true : false;
