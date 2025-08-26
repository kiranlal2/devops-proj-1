pipeline {
    agent any

    environment {
        NODE_HOME = tool name: 'nodejs', type: 'NodeJSInstallation'
        PATH = "${env.NODE_HOME}/bin:${env.PATH}"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/kiranlal2/devops-proj-1.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Next.js') {
            steps {
                // Build production and export static site into /out
                sh 'npm run build'
                sh 'npm run export'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sh '''
                # Create target directory on EC2 if not exists
                ssh -o StrictHostKeyChecking=no -i /var/lib/jenkins/kiranlal-jenkins-server.pem ubuntu@51.20.65.66 "sudo mkdir -p /var/www/nextapp && sudo chown -R ubuntu:ubuntu /var/www/nextapp"

                # Copy build output from Jenkins to EC2
                scp -o StrictHostKeyChecking=no -i /var/lib/jenkins/kiranlal-jenkins-server.pem -r out/* ubuntu@51.20.65.66:/var/www/nextapp/
                '''
            }
        }
    }
}
