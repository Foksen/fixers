FROM node:20-alpine

WORKDIR /app

# Copy frontend directory
COPY . .

# Install dependencies in the fixers-app directory
WORKDIR /app/fixers-app

# Install dependencies
RUN npm install

# Build the Next.js application
RUN npm run build

# Expose the port Next.js runs on
EXPOSE 3000

# Start the Next.js application
CMD ["npm", "start"] 