#!/usr/bin/env groovy

pipeline {
  agent any

  tools {nodejs "node"}

  stages {    
    stage('Cloning Git') {
      steps {
        git 'https://github.com/shailjava/tokensystem'
      }
    }        
    stage('Install dependencies') {
      steps {
        sh 'npm install'
      }
    }     
    stage('Test') {
      steps {
         sh 'npx directus start'
      }
    }             
  }
}
