// import { NextResponse } from 'next/server';
// // import bcrypt from 'bcryptjs';
// import { connectToDatabase } from '@/lib/mongodb';

// export async function POST(request: Request) {
//   try {
//     console.log('Starting login process...');

//     const { username, password } = await request.json();
//     console.log('Received credentials:', { username });

//     // Test database connection only
//     const db = await connectToDatabase();
//     console.log('Database connected successfully');

//     // Return test response
//     return NextResponse.json({ 
//       success: true,
//       message: 'Connection test successful'
//     });

//     /* Commenting out authentication logic
//     const collection = db.collection('users');
//     const user = await collection.findOne({ username });
    
//     if (!user) {
//       return NextResponse.json(
//         { error: 'Invalid credentials' },
//         { status: 401 }
//       );
//     }

//     const isPasswordValid = await bcrypt.compare(password, user.password);
//     if (!isPasswordValid) {
//       return NextResponse.json(
//         { error: 'Invalid credentials' },
//         { status: 401 }
//       );
//     }

//     return NextResponse.json({ 
//       success: true,
//       user: { username: user.username }
//     });
//     */

//   } catch (error) {
//     console.error('Login error:', error);
//     return NextResponse.json(
//       { error: 'Internal server error' },
//       { status: 500 }
//     );
//   }
// } 