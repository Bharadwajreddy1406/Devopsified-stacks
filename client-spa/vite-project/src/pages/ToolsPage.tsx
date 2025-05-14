const ToolsPage = () => {
  const tools = [
    {
      name: "Docker",
      description: "Containerization platform for packaging, distributing, and running applications",
      image: "https://picsum.photos/id/1/200/200",
      category: "Containerization"
    },
    {
      name: "Kubernetes",
      description: "Container orchestration platform for automating deployment, scaling, and management",
      image: "https://picsum.photos/id/2/200/200",
      category: "Orchestration"
    },
    {
      name: "GitHub Actions",
      description: "CI/CD platform integrated with GitHub for automating workflows",
      image: "https://picsum.photos/id/3/200/200",
      category: "CI/CD"
    },
    {
      name: "Jenkins",
      description: "Open-source automation server for building, testing, and deploying code",
      image: "https://picsum.photos/id/4/200/200",
      category: "CI/CD"
    },
    {
      name: "Terraform",
      description: "Infrastructure as Code tool for building, changing, and versioning infrastructure",
      image: "https://picsum.photos/id/5/200/200",
      category: "Infrastructure as Code"
    },
    {
      name: "Ansible",
      description: "Configuration management tool for automating application deployment",
      image: "https://picsum.photos/id/6/200/200",
      category: "Configuration Management"
    },
    {
      name: "Prometheus",
      description: "Monitoring system and time series database for metrics collection",
      image: "https://picsum.photos/id/7/200/200",
      category: "Monitoring"
    },
    {
      name: "Grafana",
      description: "Analytics and monitoring platform for visualizing metrics",
      image: "https://picsum.photos/id/8/200/200",
      category: "Monitoring"
    },
    {
      name: "Nginx",
      description: "Web server, reverse proxy, and load balancer",
      image: "https://picsum.photos/id/9/200/200",
      category: "Web Server"
    }
  ];

  return (
    <div className="page-transition min-h-screen bg-gray-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">DevOps Tools</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-12">
            Explore the essential tools that power modern DevOps workflows and help teams build, deploy, and monitor applications efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <div 
              key={index} 
              className="bg-white rounded-lg shadow-md overflow-hidden tool-card transform transition duration-300 hover:shadow-xl card-hover"
            >
              <div className="relative h-48 overflow-hidden">
                <img 
                  src={tool.image} 
                  alt={tool.name} 
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-0 right-0 bg-blue-600 text-white text-xs font-bold px-3 py-1 rounded-bl-lg">
                  {tool.category}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{tool.name}</h3>
                <p className="text-gray-600">{tool.description}</p>
                <div className="mt-4">
                  <button className="text-blue-600 font-medium hover:text-blue-800 transition-colors duration-200">
                    Learn more →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ToolsPage;
