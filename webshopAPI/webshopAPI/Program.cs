
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.DataProtection.Repositories;
using Microsoft.AspNetCore.Server.IISIntegration;
using Microsoft.Data.SqlClient;
using Microsoft.IdentityModel.Tokens;
using Microsoft.OpenApi.Models;
using Swashbuckle.AspNetCore.Filters;
using System.Text;
using webshopAPI.domain.Entities;
using webshopAPI.domain.Repositories.Abstract;
using webshopAPI.domain.Repositories.Concrete;
using webshopAPI.Services;
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
services.AddTransient<IOrderService, OrderService>();
services.AddTransient<IOrderRepository, OrderRepository>();
services.AddTransient<IUsersService, UsersService>();
services.AddTransient<IUsersRepository, UsersRepository>();
services.AddTransient<INewsletterRepository, NewsletterRepository>();
services.AddTransient<INewsletterService, NewsletterService>();


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

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.
                UTF8.GetBytes(builder.Configuration.GetSection("AppSettings:Token").Value)),
            ValidateIssuer = false,
            ValidateAudience= false
        };
    });

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
//services.AddAuthentication(IISDefaults.AuthenticationScheme);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(options =>
{
    options.AddSecurityDefinition("oauth2", new OpenApiSecurityScheme
    {
        Description = "Standard Authorization header using the Bearer scheme (\"bearer {token}\")",
        In = ParameterLocation.Header,
        Name = "Authorization",
        Type = SecuritySchemeType.ApiKey
    });

    options.OperationFilter<SecurityRequirementsOperationFilter>();
});



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
