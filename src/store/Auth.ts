import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";

import { AppwriteException, ID, Models } from "appwrite";
import { account } from "@/models/client/config";


interface UserPrefs {
  reputation: number;
}

interface IAuthStore {
  session: Models.Session | null;
  jwt: string | null;
  user: Models.User<UserPrefs> | null;
  hydrated: boolean;

  setHydrated(): void;
  veryfiySession(): Promise<void>;
  login(
    email: string,
    password: string
  ): Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;

  createAccount(
    name: string,
    email: string,
    password: string
  ): Promise<{
    success: boolean;
    error?: AppwriteException | null;
  }>;
  logOut(): void;

}


export const useAuthStore = create<IAuthStore>()(
  persist(
    immer((set) => ({
        session: null,
        jwt: null,
        user: null,
        hydrated: false,

        setHydrated() {
            set({hydrated: true})
        },

        async veryfiySession() {
            try {
                const session = await account.getSession("current")
                set({session})
                
            } catch (error) {
                console.log(error)
            }

        },

        async login(email, password) {
            try {
                const session = await account.createEmailPasswordSession(email, password)
                set({session})
                const [user, {jwt}] = await Promise.all([
                    account.get<UserPrefs>(),
                    account.createJWT()
                ])
                if(!user.prefs?.reputation) await account.updatePrefs<UserPrefs>({reputation: 0})
                return {success: true}
            } catch (error) {
                console.log(error)
                return {success: false, error: error instanceof AppwriteException ? error : null}
            }
        },

        async createAccount(name, email, password) {
            try {
                await account.create(ID.unique(), name, email, password)
                return {success: true}
            } catch (error) {
                console.log(error)
                return {success: false, error: error instanceof AppwriteException ? error : null}
            }
        },

        async logOut() {

        }

    })),
    {
        name: "auth",
        onRehydrateStorage() {
            return (state, error) => {
                if(!error) state?.setHydrated()
            }
        },
    }

  
)