
using Microsoft.AspNetCore.DataProtection.Repositories;
using Microsoft.AspNetCore.Server.IISIntegration;
using Microsoft.Data.SqlClient;
using webshopAPI.domain.Entities;
using webshopAPI.domain.Repositories.Abstract;
using webshopAPI.domain.Repositories.Concrete;
using webshopAPI.Services.Abstract;
using webshopAPI.Services.Concrete;

var builder = WebApplication.CreateBuilder(args);
var services = builder.Services;
var configuration = builder.Configuration;
var environment = builder.Environment;
var isProduction = environment.IsProduction();

// DB connection, service, repository registration
services.AddDbContext<WebshopContext>(ServiceLifetime.Transient, ServiceLifetime.Transient);

services.AddTransient<IProductCategoryRepository, ProductCategoryRepository>();
services.AddTransient<IProductCategoryService, ProductCategoryService>();
services.AddTransient<IVendorRepository, VendorRepsoitory>();
services.AddTransient<IVendorService, VendorService>();
services.AddTransient<IProductRepository, ProductRepository>();
services.AddTransient<IProductService, ProductService>();
services.AddTransient<ISzervizService, SzervizService>();
services.AddTransient<ISzervizRepository, SzervizRepository>();
services.AddTransient<IFaqService, FaqService>();
services.AddTransient<IFaqRepository, FaqRepository>();

// Set up Corse Policy
var MyAllowSpecificOrigins = "CorsPolicy";
var MyAllowOrigins = configuration.GetSection("AllowedHosts").Get<string[]>();
services.AddCors(options =>
{
    options.AddPolicy(MyAllowSpecificOrigins, builder => builder
        .WithOrigins(MyAllowOrigins)
        .AllowAnyMethod()
        .AllowAnyHeader()
        .AllowCredentials()
    );
}
);

//Set body json size
services.Configure<IISServerOptions>(options =>
{
    options.MaxRequestBodySize = 1000000000; // Set the desired size
});

////Prevent JSON parse infinite loop
services.AddMvc().AddNewtonsoftJson(options =>
                options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore);

services.AddMvc().AddJsonOptions(jsopts =>
{ jsopts.JsonSerializerOptions.MaxDepth = 4; }
);
// Add controllers
services.AddControllers();


// Add authentication
services.AddAuthentication(IISDefaults.AuthenticationScheme);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (isProduction == false) app.UseDeveloperExceptionPage();
app.UseHttpsRedirection();

app.UseRouting();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors(MyAllowSpecificOrigins);

app.UseAuthentication();

app.UseAuthorization();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
});

app.Run();
