import { Button } from '@/components/Button/Button';
import { html } from 'react-strict-dom';


export default function Index() {
  return (
    <html.div>
      <html.h1>Hello World</html.h1>
      <Button title="Click me" onPress={() => alert('Button pressed')} />
    </html.div>
  );
}

