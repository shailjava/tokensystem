#!/usr/bin/env groovy

pipeline {
  agent any

  tools {nodejs "nodejs"}

  stages {    
    stage('Cloning Git') {
      steps {
        git 'https://github.com/shailjava/tokensystem'
      }
    }        
    stage('Install dependencies') {
      steps {
        bat 'node --version'
        bat 'npm --version'
      }
    }     
    stage('Test') {
      steps {
         echo 'project Running...............'
      }
    }             
  }
}
