# Optimization and Shrinking
-dontoptimize
-dontpreverify
-keepattributes Signature,InnerClasses,EnclosingMethod

# Keep Native Modules
-keep public class com.facebook.react.bridge.** { *; }
-keep public class com.facebook.react.modules.** { *; }
-keep public class com.facebook.react.views.** { *; }
-keep public class com.facebook.react.uimanager.** { *; }

# Keep React Native Classes
-keep class com.facebook.** { *; }
-keep class com.reactnative.** { *; }
-keepclassmembers class * {
    @com.facebook.react.bridge.ReactMethod <methods>;
    @com.facebook.react.bridge.ReactProperty <methods>;
}

# Keep JavaScript Interface (JSI) Methods
-keepclassmembers class * {
    @android.webkit.JavascriptInterface <methods>;
}

# Prevent Removal of Debugging Information (Optional)
# Remove this for release builds to shrink further.
-keepattributes *Annotation*

# Avoid Stripping R8 Generated Classes
-keepnames class * {
    public void *(android.view.View);
}

# OkHttp
-dontwarn okhttp3.**
-keep class okhttp3.** { *; }
-keepclassmembers class okhttp3.** { *; }

# Gson (if used)
-dontwarn com.google.gson.**
-keep class com.google.gson.** { *; }
-keepclassmembers class com.google.gson.** { *; }

# Retrofit (if used)
-dontwarn retrofit2.**
-keep class retrofit2.** { *; }
-keepclassmembers class retrofit2.** { *; }

# Native Android Classes
-dontwarn android.webkit.**
-keep public class android.webkit.WebView { *; }

# Prevent issues with Hermes Engine (if used)
-dontwarn com.facebook.hermes.**
-keep class com.facebook.hermes.** { *; }

# Keep Classes for Logging (Remove for production builds to reduce size)
-assumenosideeffects class android.util.Log {
    public static *** d(...);
    public static *** e(...);
    public static *** w(...);
    public static *** i(...);
    public static *** v(...);
}

# Keep Joda-Time classes and any associated dependencies
-keep class org.joda.convert.** { *; }
-keep class org.joda.time.** { *; }
-keep class org.joda.time.DateTimeZone { *; }
-keep class org.joda.convert.FromString { *; }
-keep class org.joda.convert.ToString { *; }

# Keep all methods of DateTimeZone
-keepclassmembers class org.joda.time.DateTimeZone {
    public static org.joda.time.DateTimeZone forID(java.lang.String);
    public java.lang.String getID();
}

# Application Entry Points
-keep public class com.booksshelf10.** { *; }

# Firebase Rules (if used)
-dontwarn com.google.firebase.**
-keep class com.google.firebase.** { *; }
-keepclassmembers class com.google.firebase.** { *; }

# Exclude Generated Files (Ensure the generated code is not removed)
-dontwarn com.facebook.react.jscexecutor.**
-keep class com.facebook.react.jscexecutor.** { *; }

# Prevent Stripping of Resource References
-keepclassmembers class **.R$* {
    public static <fields>;
}

# Keep the Main Application Class
-keep class com.booksshelf10.MainApplication { *; }

# Keep Entry Points for React Native
-keep class com.facebook.react.ReactActivityDelegate { *; }
-keep class com.facebook.react.ReactActivity { *; }

# Remove Logging and Debugging Information for Release
# This can help reduce the app size for production
-dontwarn android.util.Log
-assumenosideeffects class android.util.Log {
    public static *** d(...);
    public static *** e(...);
    public static *** w(...);
    public static *** i(...);
    public static *** v(...);
}
