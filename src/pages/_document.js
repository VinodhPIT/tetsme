import Document, { Html, Head, Main, NextScript } from 'next/document';
import React from 'react';


class MyDocument extends Document {

  
  
  static async getInitialProps(ctx) {

    

    const initialProps = await Document.getInitialProps(ctx);

    // You can set a dynamic class name based on the page here
    let bodyClassName = '';

    if (ctx.pathname === '/') {
      bodyClassName = 'homeScreen';
    } else {
      bodyClassName = 'other-page';
    }

    return { ...initialProps, bodyClassName };
  }

  render() {
 
    
    return (
      
      <Html lang="en">
        <Head />
        <body className={this.props.bodyClassName}>
          <Main />
          <NextScript />



  
          
        </body>
      </Html>
    );
  }
}

export default MyDocument;
