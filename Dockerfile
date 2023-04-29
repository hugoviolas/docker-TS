# Use the official Node.js image as the base image
FROM node:latest

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json files into the container
COPY package*.json ./

# Install the project dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port your application will run on (e.g., 3000)
EXPOSE 3000

# Start the TypeScript compiler in watch mode and run nodemon
CMD ["npm", "run", "dev"]