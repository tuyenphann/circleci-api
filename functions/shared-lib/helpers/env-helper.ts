import yenv from 'yenv';

const file = 'env.yaml';

const baseEnv = yenv(file, { env: 'base' });
const env = yenv(file, { env: baseEnv.ENV_MODE });

env.tryGetValue = (name) => {
  try {
    const value = env[name];
    return value;
  } catch (err) {
    return undefined;
  }
};

env.getEnv = (targetEnv, file = 'env.yaml') => {
  return yenv(file, { env: targetEnv });
};

export default env;
