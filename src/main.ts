import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Habilitar CORS para que el frontend pueda conectarse
  app.enableCors({
    origin: true, // Permitir todas las origins en desarrollo
    credentials: true,
  });
  
  await app.listen(process.env.PORT ?? 3000);
  console.log('🚀 Backend running on http://localhost:3000');
}
bootstrap();
