import React from 'react';

interface SchemaScriptProps {
  // We use any or a generic Record to allow passing any constructed schema object
  schema: Record<string, any> | Record<string, any>[];
}

export default function SchemaScript({ schema }: SchemaScriptProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(schema).replace(/</g, '\\u003c')
      }}
    />
  );
}
