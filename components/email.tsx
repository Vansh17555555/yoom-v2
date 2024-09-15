import React from 'react';

interface EmailTemplateProps {
  firstName: string;
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({ firstName }) => (
  <div>
    <h1>Welcome, {firstName}</h1>
  </div>
);

export default EmailTemplate;
