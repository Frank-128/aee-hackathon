import 'package:flutter/material.dart';
import '../../core/services/auth_service.dart';
import '../../core/services/app_startup_service.dart';
import '../../core/routes/app_routes.dart';

class AppStartPage extends StatefulWidget {
  const AppStartPage({super.key});

  @override
  State<AppStartPage> createState() => _AppStartPageState();
}

class _AppStartPageState extends State<AppStartPage> {
  @override
  void initState() {
    super.initState();
    _decideRoute();
  }

  Future<void> _decideRoute() async {
    final isFirst = await AppStartupService.isFirstLaunch();

    if (isFirst) {
      Navigator.pushReplacementNamed(context, AppRoutes.welcome);
      return;
    }

    final loggedIn = await AuthService.isLoggedIn();

    if (!loggedIn) {
      Navigator.pushReplacementNamed(context, AppRoutes.signIn);
      return;
    }

    final role = await AuthService.getRole();

    if (role == 'farmer') {
      Navigator.pushReplacementNamed(context, AppRoutes.farmerShell);
    } else {
      Navigator.pushReplacementNamed(context, AppRoutes.buyerShell);
    }
  }

  @override
  Widget build(BuildContext context) {
    return const Scaffold(
      body: Center(
        child: CircularProgressIndicator(),
      ),
    );
  }
}
