pipeline {
    agent any

    environment {
        DEPLOY_SERVER = "51.20.65.66"
        DEPLOY_USER   = "ubuntu"
        PEM_KEY       = "/var/lib/jenkins/kiranlal-jenkins-server.pem"
        APP_DIR       = "/var/www/nextapp"
    }

    stages {
        stage('Checkout') {
            steps {
                git branch: 'main', url: 'https://github.com/kiranlal2/devops-proj-1.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh '''
                  node -v
                  npm -v
                  npm install
                '''
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
                  # Ensure Jenkins can read PEM
                  chmod 600 ${PEM_KEY}

                  # Prepare folder on EC2
                  ssh -o StrictHostKeyChecking=no -i ${PEM_KEY} ${DEPLOY_USER}@${DEPLOY_SERVER} "
                    sudo mkdir -p ${APP_DIR} &&
                    sudo rm -rf ${APP_DIR}/*
                  "

                  # Copy build artifacts
                  scp -o StrictHostKeyChecking=no -i ${PEM_KEY} -r package.json .next public ${DEPLOY_USER}@${DEPLOY_SERVER}:${APP_DIR}/
                '''
            }
        }

        stage('Start App on EC2') {
            steps {
                sh '''
                  ssh -o StrictHostKeyChecking=no -i ${PEM_KEY} ${DEPLOY_USER}@${DEPLOY_SERVER} "
                    cd ${APP_DIR} &&
                    npm install --production &&
                    pm2 delete nextapp || true &&
                    pm2 start npm --name 'nextapp' -- start
                  "
                '''
            }
        }
    }
}
