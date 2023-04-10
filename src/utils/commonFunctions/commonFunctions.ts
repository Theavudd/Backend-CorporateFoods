export const updateTokeniv = async (
  UserData: any,
  _id: any,
  tokeniv: string,
) => {
  const updateTokeniv = {
    $set: {
      tokeniv: tokeniv,
    },
  };
  const options = {
    upsert: true,
  };
  await UserData.findByIdAndUpdate(_id, updateTokeniv, options);
};
