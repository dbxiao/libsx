# Install dependencies.
rm pnpm-lock.yaml

pnpm config set registry https://registry.npmmirror.com/
pnpm config set electron_mirror=https://cdn.npmmirror.com/binaries/electron/ 
pnpm config set electron_custom_dir=25.6.0
pnpm install

# Install husky that it will auto format all codes when codes were changed.
pnpm run prepare


