import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

// Define the tutorial type
interface Tutorial {
  id: number;
  title: string;
  description: string;
  difficulty: string;
  image: string;
  content: string;
}

const TutorialsPage = () => {
  const tutorials: Tutorial[] = [
    {
      id: 1,
      title: "How to Dockerize a Vite App",
      description: "Learn how to create a Docker container for your Vite application for consistent deployment across environments.",
      difficulty: "Beginner",
      image: "https://picsum.photos/id/26/400/200",
      content: `
        ## Dockerizing Your Vite App

        ### Step 1: Create a Dockerfile
        Create a file named \`Dockerfile\` in your project root with the following content:

        \`\`\`dockerfile
        # Build stage
        FROM node:20-alpine as build
        WORKDIR /app
        COPY package*.json ./
        RUN npm install
        COPY . .
        RUN npm run build

        # Production stage
        FROM nginx:alpine
        COPY --from=build /app/dist /usr/share/nginx/html
        EXPOSE 80
        CMD ["nginx", "-g", "daemon off;"]
        \`\`\`

        ### Step 2: Create a .dockerignore file
        Add a \`.dockerignore\` file to exclude unnecessary files:

        \`\`\`
        node_modules
        npm-debug.log
        Dockerfile
        .dockerignore
        .git
        .github
        .gitignore
        README.md
        \`\`\`

        ### Step 3: Build and run your Docker image
        Run these commands to build and run your containerized Vite app:

        \`\`\`bash
        docker build -t my-vite-app .
        docker run -p 8080:80 my-vite-app
        \`\`\`

        ### Step 4: Access your app
        Open http://localhost:8080 in your browser to see your containerized Vite app.
      `
    },
    {
      id: 2,
      title: "CI/CD with GitHub Actions",
      description: "Set up a complete CI/CD pipeline for your React application using GitHub Actions.",
      difficulty: "Intermediate",
      image: "https://picsum.photos/id/28/400/200",
      content: `
        ## Setting up CI/CD with GitHub Actions for a Vite App

        ### Step 1: Create GitHub Actions Workflow
        Create a file at \`.github/workflows/ci-cd.yml\`:

        \`\`\`yaml
        name: CI/CD Pipeline

        on:
          push:
            branches: [ main ]
          pull_request:
            branches: [ main ]

        jobs:
          build-and-test:
            runs-on: ubuntu-latest
            
            steps:
            - uses: actions/checkout@v3
            
            - name: Setup Node.js
              uses: actions/setup-node@v3
              with:
                node-version: '20'
                cache: 'npm'
            
            - name: Install dependencies
              run: npm ci
              
            - name: Build
              run: npm run build
              
            - name: Lint
              run: npm run lint
              
            - name: Upload build artifacts
              uses: actions/upload-artifact@v3
              with:
                name: build-files
                path: ./dist
        \`\`\`

        ### Step 2: Add Deployment (Optional)
        Add a deployment job to your workflow:

        \`\`\`yaml
        deploy:
          needs: build-and-test
          runs-on: ubuntu-latest
          if: github.ref == 'refs/heads/main'
          
          steps:
          - name: Download build artifacts
            uses: actions/download-artifact@v3
            with:
              name: build-files
              path: ./dist
              
          - name: Deploy to GitHub Pages
            uses: peaceiris/actions-gh-pages@v3
            with:
              github_token: \${{ secrets.GITHUB_TOKEN }}
              publish_dir: ./dist
        \`\`\`

        ### Step 3: Configure your Repository
        1. Go to your repository settings
        2. Navigate to Pages
        3. Set the source to GitHub Actions
        
        Now your app will automatically build, test, and deploy whenever you push to main!
      `
    },
    {
      id: 3,
      title: "Serve SPA with Nginx",
      description: "Configure Nginx to properly serve a single-page application with client-side routing.",
      difficulty: "Beginner",
      image: "https://picsum.photos/id/30/400/200",
      content: `
        ## Serving a Vite SPA with Nginx

        ### Step 1: Basic Nginx Configuration
        Create a file named \`nginx.conf\`:

        \`\`\`nginx
        server {
            listen 80;
            server_name your-domain.com;
            root /usr/share/nginx/html;
            index index.html;
            
            # Important for SPAs - redirect all requests to index.html
            location / {
                try_files $uri $uri/ /index.html;
            }
            
            # Cache static assets
            location ~* \\.(?:jpg|jpeg|gif|png|ico|svg|woff|woff2|ttf|css|js)$ {
                expires 30d;
                add_header Cache-Control "public, max-age=2592000";
            }
            
            # Gzip compression
            gzip on;
            gzip_types text/plain text/css application/json application/javascript text/xml application/xml application/xml+rss text/javascript;
        }
        \`\`\`

        ### Step 2: Using in Docker
        In your Dockerfile:

        \`\`\`dockerfile
        FROM nginx:alpine
        COPY ./dist /usr/share/nginx/html
        COPY ./nginx.conf /etc/nginx/conf.d/default.conf
        EXPOSE 80
        CMD ["nginx", "-g", "daemon off;"]
        \`\`\`

        ### Step 3: Run Nginx
        If using Docker:

        \`\`\`bash
        docker build -t my-spa .
        docker run -p 80:80 my-spa
        \`\`\`

        If installed directly:

        \`\`\`bash
        sudo cp nginx.conf /etc/nginx/sites-available/my-spa
        sudo ln -s /etc/nginx/sites-available/my-spa /etc/nginx/sites-enabled/
        sudo systemctl restart nginx
        \`\`\`

        ### Step 4: Testing
        Open your browser and navigate to your domain or localhost. The SPA should handle client-side routing correctly!
      `
    },
    {
      id: 4,
      title: "Monitoring Your Application with Prometheus",
      description: "Set up basic monitoring for your web application using Prometheus and Grafana.",
      difficulty: "Advanced",
      image: "https://picsum.photos/id/24/400/200",
      content: `
        ## Monitoring Your App with Prometheus and Grafana

        ### Step 1: Set Up Prometheus
        Create a \`prometheus.yml\` configuration file:

        \`\`\`yaml
        global:
          scrape_interval: 15s

        scrape_configs:
          - job_name: 'web-app'
            static_configs:
              - targets: ['localhost:8080']
        \`\`\`

        ### Step 2: Run Prometheus with Docker
        \`\`\`bash
        docker run -d --name prometheus -p 9090:9090 -v $(pwd)/prometheus.yml:/etc/prometheus/prometheus.yml prom/prometheus
        \`\`\`

        ### Step 3: Set Up Grafana
        \`\`\`bash
        docker run -d --name grafana -p 3000:3000 grafana/grafana
        \`\`\`

        ### Step 4: Configure Grafana
        1. Open Grafana at http://localhost:3000 (default login: admin/admin)
        2. Add Prometheus as a data source:
           - URL: http://prometheus:9090
           - Access: Server (if using Docker network) or Browser
        3. Import a dashboard (ID: 1860) or create custom panels

        ### Step 5: Instrument Your App
        For a JavaScript application, you can use libraries like:
        - Prometheus client for Node.js
        - OpenTelemetry for browser metrics

        Simple example for Express.js:
        \`\`\`javascript
        const express = require('express');
        const client = require('prom-client');
        
        const app = express();
        const counter = new client.Counter({
          name: 'http_requests_total',
          help: 'Total HTTP requests',
          labelNames: ['method', 'path', 'status']
        });
        
        app.use((req, res, next) => {
          res.on('finish', () => {
            counter.inc({
              method: req.method,
              path: req.path,
              status: res.statusCode
            });
          });
          next();
        });
        
        app.get('/metrics', async (req, res) => {
          res.set('Content-Type', client.register.contentType);
          res.end(await client.register.metrics());
        });
        \`\`\`

        Now you can monitor your application's performance and health in real time!
      `
    }
  ];

  const [selectedTutorial, setSelectedTutorial] = useState<Tutorial | null>(null);

  return (
    <div className="page-transition min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">DevOps Tutorials</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Learn how to implement DevOps practices with these step-by-step guides.
          </p>
        </div>

        {selectedTutorial ? (
          <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-12 animate-fade-in">
            <div className="relative h-48 md:h-64 overflow-hidden">
              <img 
                src={selectedTutorial.image} 
                alt={selectedTutorial.title}
                className="w-full h-full object-cover"
              />
              <button 
                onClick={() => setSelectedTutorial(null)}
                className="absolute top-4 right-4 bg-white text-gray-800 p-2 rounded-full shadow-md hover:bg-gray-100 transition duration-200"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-6">
                <span className="inline-block bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-md mb-2">
                  {selectedTutorial.difficulty}
                </span>
                <h2 className="text-2xl font-bold text-white">{selectedTutorial.title}</h2>
              </div>
            </div>
            <div className="p-6">
              <div className="prose prose-blue max-w-none">
                <ReactMarkdown
                  children={selectedTutorial.content}
                  components={{
                    code({node, inline, className, children, ...props}: {
                      node: any;
                      inline?: boolean;
                      className?: string;
                      children: React.ReactNode;
                      [key: string]: any;
                    }) {
                      const match = /language-(\w+)/.exec(className || '');
                      return !inline && match ? (
                        <SyntaxHighlighter
                          style={dracula}
                          language={match[1]}
                          PreTag="div"
                          {...props}
                        >
                          {String(children).replace(/\n$/, '')}
                        </SyntaxHighlighter>
                      ) : (
                        <code className={className} {...props}>
                          {children}
                        </code>
                      );
                    }
                  }}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {tutorials.map((tutorial) => (
              <div 
                key={tutorial.id} 
                className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer transform transition duration-300 hover:-translate-y-1 hover:shadow-xl"
                onClick={() => setSelectedTutorial(tutorial)}
              >
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={tutorial.image} 
                    alt={tutorial.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                    {tutorial.difficulty}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">{tutorial.title}</h3>
                  <p className="text-gray-600 mb-4">{tutorial.description}</p>
                  <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-200">
                    Read tutorial →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TutorialsPage;
