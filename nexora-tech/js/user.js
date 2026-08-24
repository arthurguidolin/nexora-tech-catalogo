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

    register: ({ name, email, password }) => {
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
    },

    login: (email, password) => {
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
    },

    logout: () => {
      localStorage.removeItem(sessionKey);
    }
  };
})();