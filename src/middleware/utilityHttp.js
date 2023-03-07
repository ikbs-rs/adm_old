export const checkPermissions = (par1 = 'default1', par2 = 'default2') => {
    return (req, res, next) => {
      console.log('Dosao', par1);
      next();
    }
  }