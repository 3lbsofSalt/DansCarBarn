import { ref, computed } from 'vue';
import { defineStore } from 'pinia';
import { login as apiLogin } from '../api/login';
import { getSelf } from '../api/user';

export const useUserStore = defineStore('user', () => {

  const balance = ref(0);

  const parseToken = (t) => {
    const token = {};
    token.raw = t;
    token.header = JSON.parse(window.atob(t.split('.')[0]));
    token.payload = JSON.parse(window.atob(t.split('.')[1]));
    return token;
  }

  const token = localStorage.getItem('auth');
  const userToken = ref(token ? parseToken(token) : null);

  const login = async (email, password) => {
    const token = await apiLogin(email, password);
    userToken.value = parseToken(token);
  }

  const refreshBalance = async () => {
    const self = await getSelf();
    balance.value = self.user.balance;
  }

  return { userToken, balance, parseToken, login, refreshBalance };
});
