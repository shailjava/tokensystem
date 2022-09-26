#!/usr/bin/env groovy

pipeline {
  agent any

//   tools {nodejs "node"}

  stages {    
    stage('Cloning Git') {
      steps {
        git 'https://github.com/shailjava/tokensystem'
      }
    }        
    stage('Install dependencies') {
      steps {
        echo 'Installing dependencies...............'
      }
    }     
    stage('Test') {
      steps {
         echo 'project Running...............'
      }
    }             
  }
}
