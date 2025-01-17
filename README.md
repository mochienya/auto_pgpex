# auto_pgp
Small tool to to automatically get Abacus 2fa login code.

## how to use
1. copy PGP message from abacus's "Two-factor Authentication" page
2. run the program `bun run src/linux.ts` or `bun run src/windows.ts`
3. paste your new clipboard contents into the "Security code" field and proceed

## setup
1. [install bun](https://bun.sh/)
2. [install xsel](https://github.com/kfish/xsel) (for linux users, windows users can skip this)
3. save your Abacus private key  to `private_key.asc` (ensure it's saved with proper formatting, ie `-----BEGIN PGP PRIVATE KEY BLOCK-----\n\nKEY...` )
4. `bun i`

## How can I trust this won't do something stupid?
Read the source code, `src/*` is less than 50 lines

All this does is:
1. Read clipboard content
2. Read your pgp key
3. Decode clipboard using pgp key
4. Use regex to find login key
5. Send that key to your clipboard
