import 'package:flutter/material.dart';
import 'core/theme/app_theme.dart';
import 'core/routes/app_routes.dart';

void main() {
  runApp(const RhinoApp());
}

class RhinoApp extends StatelessWidget {
  const RhinoApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'Rhino',
      theme: AppTheme.lightTheme,
      initialRoute: AppRoutes.welcome,
      routes: AppRoutes.routes,
      debugShowCheckedModeBanner: false,
    );
  }
}
