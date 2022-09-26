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
        bat 'npm install'
      }
    }     
    stage('Test') {
      steps {
         echo 'project Running...............'
      }
    }             
  }
}
