pipeline {
    agent any

    tools {
        nodejs "nodejs"
    }

    stages {
        stage('Clone Repo') {
            steps {
                git branch: 'main', url: 'https://github.com/kiranlal2/devops-proj-1.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build Next.js App') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy to EC2') {
            steps {
                sh '''
                  ssh -o StrictHostKeyChecking=no -i /var/lib/jenkins/kiranlal-jenkins-server.pem ubuntu@51.20.65.66 "
                    sudo rm -rf /var/www/nextapp/*
                    mkdir -p /var/www/nextapp
                  "
                  scp -i /var/lib/jenkins/kiranlal-jenkins-server.pem -r .next/* ubuntu@51.20.65.66:/var/www/nextapp/
                '''
            }
        }
    }
}
