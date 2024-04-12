FROM node:16

# Set the working directory in the container
WORKDIR /usr/src/app

# Install pnpm
RUN npm install -g pnpm

# Copy package.json and pnpm-lock.yaml (or just package.json) into the working directory
COPY package.json pnpm-lock.yaml ./

# Install project dependencies using pnpm
RUN pnpm install

# Copy the rest of your application's code
COPY . .

# Build the app using Vite
RUN pnpm run build

# Start the app using Vite's production server
CMD ["pnpm", "run", "serve"]
