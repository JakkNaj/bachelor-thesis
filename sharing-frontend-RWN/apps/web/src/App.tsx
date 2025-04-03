import { Button } from '@monorepo/shared';

export const App = () => {
  return (
    <div style={{ padding: 20 }}>
      <h1>Web App</h1>
      <Button 
        title="Click me!" 
        onPress={() => alert('Button clicked!')} 
        variant="primary"
      />
    </div>
  );
};
