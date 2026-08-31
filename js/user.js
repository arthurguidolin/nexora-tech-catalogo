const User = (() => {
  const usersKey = 'nexora_users';
  const sessionKey = 'nexora_session';

  const users = () => {
    return JSON.parse(localStorage.getItem(usersKey) || '[]');
  };

  const current = () => {
    return JSON.parse(localStorage.getItem(sessionKey) || 'null');
  };

  return {
    current,

    register: async ({ name, email, password }) => {
      try {
        const createdUser = await Api.createUser({ name, email, password });
        localStorage.setItem(
          sessionKey,
          JSON.stringify({
            name: createdUser.name || name,
            email: createdUser.email || email
          })
        );
        return createdUser;
      } catch (err) {
        if (users().some((user) => user.email === email)) {
          throw Error('Este e-mail já possui uma conta.');
        }

        const user = { name, email, password };

        localStorage.setItem(
          usersKey,
          JSON.stringify([...users(), user])
        );

        localStorage.setItem(
          sessionKey,
          JSON.stringify({ name, email })
        );

        return user;
      }
    },

    login: async (email, password) => {
      try {
        const apiUsers = await Api.getUsers();
        const user = apiUsers.find(
          (u) => (u.email || u.Email) === email
        );

        if (!user) {
          throw Error('E-mail ou senha incorretos.');
        }

        localStorage.setItem(
          sessionKey,
          JSON.stringify({
            name: user.name || user.Name,
            email: user.email || user.Email
          })
        );

        return user;
      } catch (err) {
        const user = users().find(
          (user) =>
            user.email === email &&
            user.password === password
        );

        if (!user) {
          throw Error('E-mail ou senha incorretos.');
        }

        localStorage.setItem(
          sessionKey,
          JSON.stringify({
            name: user.name,
            email: user.email
          })
        );

        return user;
      }
    },

    logout: () => {
      localStorage.removeItem(sessionKey);
    }
  };
})();